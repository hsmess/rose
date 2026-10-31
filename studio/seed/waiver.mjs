// Generates waiver.ndjson (the standard participation waiver) for import into Sanity:
//   node seed/waiver.mjs
//   npx sanity dataset import seed/waiver.ndjson production --replace
// Run from the studio/ directory. Re-running the import overwrites edits made to this document in the Studio.
import { writeFileSync } from 'node:fs'

let n = 0
const key = () => `w${(n++).toString(36)}`

// Inline text: **bold** is supported
const spans = (text) =>
  text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((t) =>
    t.startsWith('**')
      ? { _type: 'span', _key: key(), text: t.slice(2, -2), marks: ['strong'] }
      : { _type: 'span', _key: key(), text: t, marks: [] }
  )

const p = (text) => ({ _type: 'block', _key: key(), style: 'normal', markDefs: [], children: spans(text) })
const bullets = (items) =>
  items.map((text) => ({
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: spans(text),
  }))
const section = (heading, body) => ({ _type: 'section', _key: key(), heading, body })

const doc = {
  _id: 'waiver-standard',
  _type: 'waiver',
  title: 'Participation Liability Waiver - Ratatoskr Disc Golf Events',
  slug: { _type: 'slug', current: 'standard' },
  sections: [
    section('Liability Waiver and Release Agreement', [
      p('I acknowledge that I am voluntarily participating in this Ratatoskr Disc Golf Events tournament. In consideration of being permitted to participate in this event, I agree to the following:'),
      ...bullets([
        'I understand that participating in disc golf involves inherent risks of injury, including but not limited to: being struck by flying discs, collisions with other participants, falls, trips and contact with course obstacles, trees, and terrain.',
        'I confirm that I am physically fit and capable of participating in this event and have not been advised otherwise by a qualified medical professional.',
        'I agree to follow all event rules, safety guidelines, and instructions provided by tournament officials and venue staff.',
        'I acknowledge that I am responsible for my own safety and agree to exercise reasonable caution during participation.',
      ]),
      p('**Release of Liability:**'),
      p('I hereby release, waive, and discharge Ratatoskr Disc Golf Events, Tour Courses, their officers, employees, volunteers, and representatives from any and all liability, claims, demands, actions, and causes of action whatsoever arising out of or related to any loss, damage, or injury that may be sustained by me while participating in or travelling to and from the event.'),
    ]),
    section('Cancellations', [
      p("In the unlikely scenario that the event needs to be cancelled on short notice, the event will be rearranged at our earliest convenience. If the event is unable to be rearranged, players will be offered a refund minus platform fees. If Players Packs have been purchased for the event, we reserve the right to offer a partial refund and the players' pack as per PDGA rules. Ratatoskr Disc Golf Events will not be held liable for additional costs incurred by participants due to event cancellation."),
    ]),
    section('Property and Venue Respect', [
      p('I agree to:'),
      ...bullets([
        'Follow all venue-specific rules and restrictions',
        'Be responsible for any damage I may cause to the venue or property',
        'Not consume illegal drugs during the tournament',
      ]),
    ]),
    section('Photography Consent', [
      p('Photographs and recordings may be taken during the event. We will use photographs, videos, and recordings taken of me during the event for promotional purposes. If you wish to opt-out of this, please contact the event organisers directly.'),
    ]),
  ],
}

writeFileSync(new URL('./waiver.ndjson', import.meta.url), JSON.stringify(doc) + '\n')
console.log('Wrote seed/waiver.ndjson')
