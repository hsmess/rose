// Generates homePage.ndjson (the "ROSE Series Explainer" copy) for import into Sanity:
//   node seed/homePage.mjs
//   npx sanity dataset import seed/homePage.ndjson production --replace
// Run from the studio/ directory. Re-running the import overwrites any edits made to the Home Page in the Studio.
import { writeFileSync } from 'node:fs'

let n = 0
const key = () => `k${(n++).toString(36)}`

// Inline text: **bold** is supported
const spans = (text) =>
  text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((t) =>
    t.startsWith('**')
      ? { _type: 'span', _key: key(), text: t.slice(2, -2), marks: ['strong'] }
      : { _type: 'span', _key: key(), text: t, marks: [] }
  )

const p = (text) => ({ _type: 'block', _key: key(), style: 'normal', markDefs: [], children: spans(text) })
const li = (text, listItem = 'bullet') => ({
  _type: 'block', _key: key(), style: 'normal', listItem, level: 1, markDefs: [], children: spans(text),
})
const bullets = (items) => items.map((t) => li(t))
const numbers = (items) => items.map((t) => li(t, 'number'))
const table = (rows) => ({
  _type: 'simpleTable',
  _key: key(),
  rows: rows.map((cells) => ({ _type: 'tableRow', _key: key(), cells })),
})
const section = (heading, body) => ({ _type: 'section', _key: key(), heading, body })

const doc = {
  _id: 'homePage',
  _type: 'homePage',
  showComingSoon: false,
  bannerText: '2027 dates coming soon',
  title: 'ROSE Series Explainer',
  updated: '29th October',
  intro: [
    p('Welcome to the ROSE Winter Series! This guide covers:'),
    ...bullets([
      'what the ROSE Series is aiming for',
      'how each season works',
      'how points and divisions work',
    ]),
  ],
  sections: [
    section('ROSE goals', [
      p('ROSE began as a five-event, off-season pilot in 2026, bringing new players, women, juniors and experienced disc golfers together at one-day events. It was a wonderful series, and so many players have asked for it to return for 2027.'),
      p('Our aim is simple: to run consistent, high-quality events in formats that suit the game in the UK today. Our goals are to:'),
      ...bullets([
        'elevate amateur competition and celebrate participants at every level, from first-time players to seasoned competitors',
        'create events with a welcoming, social atmosphere, so a PDGA event feels like more than just a tournament',
        'raise standards through better infrastructure and a more polished player experience',
        'standardise costs, divisions and expectations across the series, so players know what to expect wherever they play',
        'give each season its own identity, building to a finale worth qualifying for',
      ]),
    ]),
    section('Season structure', [
      p('ROSE 2027 is split into three seasons – Winter, Spring and Summer – running from the end of 2026 through 2027.'),
      p('Each season builds to its own finale: a one-day, small-field matchplay event of two rounds for qualified players. We want to take our finales to the best venues we can, with formats and experiences that make each one a highlight of the year. With a separate points race each season, every part of the year offers something different and a fresh chance to qualify.'),
      p("The Winter Series is made up of five one-day events, running until February / March. It will kick off at Gilly's on Saturday 28th November. The Spring and Summer Series will follow, and will include four one-day events and a two-day event, with dates and venues announced in due course."),
    ]),
    section('Points and divisions', [
      p("Every event awards points within independent divisions. Each player's best three results count towards their season total, and the top four players in each division qualify for the season finale."),
      p('Further details on ties and qualifying tie-breakers are at the end of this section.'),
      p('Events at 9-hole courses have smaller average division sizes, so they use a modified points allocation:'),
      table([
        ['Finish', 'Standard events (up to 72 players)', '9-hole events (up to 45 players)'],
        ['Champion', '100', '100'],
        ['2nd', '80', '65'],
        ['3rd', '65', '40'],
        ['4th', '50', '25'],
        ['5th', '40', '15'],
        ['6th', '30', '–'],
        ['7th', '25', '–'],
        ['8th', '20', '–'],
        ['9th', '15', '–'],
        ['10th', '10', '–'],
      ]),
      p('With this in mind, we will run a reduced set of divisions, at least for the Winter Series. As participation and the number of events grow, we hope to reintroduce more PDGA divisions.'),
      ...bullets(['MPO / FPO', 'MA2 / FA2', 'MA3 / FA3', 'MA4 / FA4', 'MA40 / FA40', 'MJ18 / FJ18']),
      p('We are running just 12 divisions for the following reasons:'),
      ...bullets([
        'Fewer divisions let us give each one equal recognition, guaranteeing the same number of finale spots per division and letting us invest in a set number of perpetual season trophies.',
        'Capping the finale at 48 players makes qualifying more sought after and gives us greater flexibility with venues and their requirements.',
        'Larger, more regular fields in each division make the points race fairer, with fewer swings in opportunity from one event to the next.',
        'Removing MA1 / FA1 makes the competition the best it can be. ROSE will always be about the experience rather than playing for cash or vouchers - and we will always offer the choice to maintain amateur status to ams playing in open. We hope the open divisions become a place where competitive professionals and the best amateurs compete side by side.',
        'MA40 / FA40 have long had high participation and remain a dedicated home for amateur masters. Professionals can test themselves in open, while less experienced masters can try their hand in MA4 / FA4.',
      ]),
    ]),
    section('Further details on points', [
      p('**(i) Tied players** share the points for their position and the places they cover below it, rounded up to the nearest whole number. For example:'),
      ...bullets([
        'Two players tied for 2nd share the points for 2nd and 3rd, taking 73 points each (rounded up from 72.5).',
        'Three players tied for 2nd share the points for 2nd, 3rd and 4th, taking 65 points each.',
        'Two players tied for 10th share the points for 10th (no points are awarded for 11th), taking 5 points each.',
      ]),
      p('**(ii) If players are tied for a qualifying place** at the finale, these tie-breakers apply in order:'),
      ...numbers([
        'Best finish at a single event',
        'Most events with that best finish',
        'Average PDGA round rating across their three included finishes',
        'Higher PDGA player rating',
      ]),
      p('**(iii) Due to the nature of a matchplay finale,** players who have qualified for a division they are no longer eligible for (since their rating has increased beyond the threshold) are allowed to compete.'),
    ]),
  ],
  signupHeading: 'Get updates',
  signupText: "Sign up and we'll let you know as soon as dates, venues and season passes are announced.",
}

writeFileSync(new URL('./homePage.ndjson', import.meta.url), JSON.stringify(doc) + '\n')
console.log('Wrote seed/homePage.ndjson')
