import { useState } from 'react'
import { useClient } from 'sanity'
import { Box, Button, Card, Container, Flex, Heading, Stack, Text } from '@sanity/ui'
import * as pdfjsLib from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

const LAYOUTS = ['p', 'g']
const TARGET_WIDTH = 1600

const docIdFor = (layout, hole) => `caddyPage-${layout}-h${hole}`

// Page 1..N/2 -> p/h1..; N/2+1..N -> g/h1..
const mapPages = (pageCount) => {
  const perLayout = pageCount / LAYOUTS.length
  return Array.from({ length: pageCount }, (_, i) => ({
    pageNumber: i + 1,
    layout: LAYOUTS[Math.floor(i / perLayout)],
    hole: (i % perLayout) + 1,
  }))
}

const renderPage = async (pdf, pageNumber) => {
  const page = await pdf.getPage(pageNumber)
  const base = page.getViewport({ scale: 1 })
  const viewport = page.getViewport({ scale: TARGET_WIDTH / base.width })
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(viewport.width)
  canvas.height = Math.round(viewport.height)
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  return { blob, previewUrl: URL.createObjectURL(blob) }
}

export default function CaddyBookUpload() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [rendered, setRendered] = useState(null) // [{pageNumber, layout, hole, blob, previewUrl}]
  const [busy, setBusy] = useState(false)

  const onFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setError('')
    setRendered(null)
    setBusy(true)
    try {
      setStatus('Reading PDF…')
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise
      if (pdf.numPages % LAYOUTS.length !== 0) {
        throw new Error(
          `This PDF has ${pdf.numPages} pages. It must be an even number (first half is layout p, second half is layout g).`
        )
      }
      const mapping = mapPages(pdf.numPages)
      const out = []
      for (const m of mapping) {
        setStatus(`Rendering page ${m.pageNumber} of ${pdf.numPages}…`)
        out.push({ ...m, ...(await renderPage(pdf, m.pageNumber)) })
      }
      setRendered(out)
      setStatus('')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Could not read that PDF.')
      setStatus('')
    } finally {
      setBusy(false)
    }
  }

  const publish = async () => {
    setBusy(true)
    setError('')
    try {
      const keepIds = new Set()
      for (const [i, p] of rendered.entries()) {
        setStatus(`Uploading ${p.layout}/h${p.hole} (${i + 1} of ${rendered.length})…`)
        const asset = await client.assets.upload('image', p.blob, {
          filename: `caddy-${p.layout}-h${p.hole}.png`,
        })
        const _id = docIdFor(p.layout, p.hole)
        keepIds.add(_id)
        await client.createOrReplace({
          _id,
          _type: 'caddyPage',
          layout: p.layout,
          hole: p.hole,
          image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        })
      }
      // Drop pages left over from a previous, longer book (e.g. h10-h18 after going 36 -> 18 pages).
      const existing = await client.fetch('*[_type == "caddyPage"]._id')
      const stale = existing.filter((id) => !keepIds.has(id.replace(/^drafts\./, '')))
      if (stale.length) {
        const tx = client.transaction()
        stale.forEach((id) => tx.delete(id))
        await tx.commit()
      }
      setStatus(`Done. ${rendered.length} pages are live${stale.length ? `, ${stale.length} old ones removed` : ''}.`)
      setRendered(null)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Upload failed.')
      setStatus('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Container width={3} padding={4}>
      <Stack space={4}>
        <Heading size={2}>Caddy book upload</Heading>
        <Text muted size={1}>
          Upload the full PDF. The first half of the pages become layout p, the second half layout g, at
          /live-caddy-book/&#123;p|g&#125;/h&#123;n&#125;. This replaces the whole book. To change one page,
          edit its "Caddy Book Page" document instead.
        </Text>
        <input type="file" accept="application/pdf" onChange={onFile} disabled={busy} />
        {status && <Text size={1}>{status}</Text>}
        {error && (
          <Card tone="critical" padding={3} radius={2}>
            <Text size={1}>{error}</Text>
          </Card>
        )}
        {rendered && (
          <Stack space={3}>
            <Text size={1}>
              {rendered.length} pages ready: {LAYOUTS[0]}/h1–h{rendered.length / LAYOUTS.length} and{' '}
              {LAYOUTS[1]}/h1–h{rendered.length / LAYOUTS.length}. Check the order, then publish.
            </Text>
            <Flex wrap="wrap" gap={2}>
              {rendered.map((p) => (
                <Box key={p.pageNumber} style={{ width: 90 }}>
                  <img src={p.previewUrl} alt="" style={{ width: '100%', display: 'block' }} />
                  <Text size={0} align="center">{p.layout}/h{p.hole}</Text>
                </Box>
              ))}
            </Flex>
            <Button text="Publish these pages" tone="positive" onClick={publish} disabled={busy} />
          </Stack>
        )}
      </Stack>
    </Container>
  )
}
