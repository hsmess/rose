// Creates the ROSE Winter season, its events, and points the Home Page at it. Safe to re-run: existing docs are kept.
//   npx sanity exec seed/winterSeason.js --with-user-token
// Run from the studio/ directory.
import { createReadStream } from 'node:fs'
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })
const SCHEDULE_IMAGE = process.env.SCHEDULE_IMAGE // optional path to the schedule graphic

// Times are not announced yet: stored as 09:00 UK with "Hide time" on
const events = [
  { id: 'event-rose-winter-box-end', slug: 'box-end', title: 'ROSE Winter - Box End', label: 'Box End', date: '2027-01-10T09:00:00.000Z' },
  { id: 'event-rose-winter-cotswold-view', slug: 'cotswold-view', title: 'ROSE Winter - Cotswold View', label: 'Cotswold View', date: '2027-01-24T09:00:00.000Z' },
  { id: 'event-rose-winter-delamere', slug: 'delamere', title: 'ROSE Winter - Delamere', label: 'Delamere', date: '2027-01-30T09:00:00.000Z' },
  { id: 'event-rose-winter-the-national', slug: 'the-national', title: 'ROSE Winter - The National', label: 'The National', date: '2027-02-13T09:00:00.000Z' },
  { id: 'event-rose-winter-finals', slug: 'quarry-park', title: 'ROSE Winter Finals - Quarry Park', label: 'Finals: Quarry Park', date: '2027-03-06T09:00:00.000Z' },
]

const refFor = (id, i) => ({ _type: 'reference', _key: `e${i}`, _ref: id })

const main = async () => {
  // Gilly's already exists with an auto-generated id
  const gillys = await client.fetch(`*[_type == "event" && slug.current == "gillys"][0]._id`)
  if (!gillys) throw new Error("Couldn't find the Gilly's event (slug gillys)")
  await client.patch(gillys).setIfMissing({ calendarLabel: "Gilly's" }).commit()

  for (const e of events) {
    await client.createIfNotExists({
      _id: e.id,
      _type: 'event',
      title: e.title,
      slug: { _type: 'slug', current: e.slug },
      calendarLabel: e.label,
      date: e.date,
      hideTime: true,
      status: 'confirmed',
    })
  }

  const season = {
    _id: 'season-rose-winter',
    _type: 'season',
    title: 'ROSE Winter',
    slug: { _type: 'slug', current: 'rose-winter' },
    events: [gillys, ...events.map((e) => e.id)].map(refFor),
  }
  if (process.env.SCHEDULE_IMAGE) {
    const asset = await client.assets.upload('image', createReadStream(SCHEDULE_IMAGE), { filename: 'rose-winter-schedule.webp' })
    season.image = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    season.imageAlt =
      "ROSE Winter schedule: Gilly's 28 November, Box End 10 January, Cotswold View 24 January, Delamere 30 January, The National 13 February, Finals at Quarry Park 6 March"
  }
  await client.createIfNotExists(season)

  const home = await client.fetch(`*[_type == "homePage"][0]._id`)
  if (!home) throw new Error('No homePage document found')
  await client.patch(home).set({ currentSeason: { _type: 'reference', _ref: 'season-rose-winter' } }).commit()

  console.log('Done: season-rose-winter created, home page pointed at it.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
