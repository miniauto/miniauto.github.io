import type { MiniApp } from '../types'

export const STARTERS: MiniApp[] = [
  {
    id: 'click-plumbing',
    name: 'Click Plumbing',
    initials: 'CP',
    description: 'Turn a job walk into a bid without rebuilding the spreadsheet.',
    category: 'Trade',
    repo: 'miniauto/click-plumbing',
    repoUrl: 'https://github.com/miniauto/miniauto.github.io',
    lines: 1842,
    sizeKb: 246,
    lastUpdate: 'Sep 10',
    updatesPerWeek: 4.3,
    shots: [
      { title: 'Job walk', bars: [80, 46, 62] },
      { title: 'Bid sheet', bars: [70, 88, 34] },
    ],
    versions: [
      { hash: '2e91aa', shipped: 'Aug 18', note: 'First bid sheet' },
      { hash: '7b14c8', shipped: 'Aug 29', note: 'Saved fixture lists' },
      { hash: 'a3f9c1', shipped: 'Sep 3', note: 'Customer-facing bid' },
    ],
    reviewsByHash: {
      '2e91aa': [
        {
          author: 'Sam H.',
          rating: 4,
          text: 'Better than the spreadsheet. Still too many taps to add fixtures.',
          date: 'Aug 20',
        },
        {
          author: 'Dee M.',
          rating: 4,
          text: 'Used it in the truck. Numbers were close enough to send.',
          date: 'Aug 22',
        },
      ],
      '7b14c8': [
        {
          author: 'Sam H.',
          rating: 5,
          text: 'Fixture lists fixed the thing I complained about. Keeping this.',
          date: 'Aug 30',
        },
        {
          author: 'Luis T.',
          rating: 4,
          text: 'Fast. I still want a way to save a customer’s last fixture list.',
          date: 'Sep 1',
        },
        {
          author: 'Rae C.',
          rating: 5,
          text: 'This version is the one I showed the shop.',
          date: 'Sep 2',
        },
      ],
      a3f9c1: [
        {
          author: 'Maya R.',
          rating: 5,
          text: 'Used this on three service calls today. The bid came out the same way each time.',
          date: 'Sep 8',
        },
        {
          author: 'Luis T.',
          rating: 4,
          text: 'I can hand the phone to a customer now. That was the missing piece.',
          date: 'Sep 6',
        },
        {
          author: 'Andrea K.',
          rating: 5,
          text: 'This is the first plumbing tool I have trusted in front of a customer.',
          date: 'Sep 3',
        },
      ],
    },
  },
  {
    id: 'pipe-texas',
    name: 'Pipe Texas',
    initials: 'PT',
    description: 'Count pipe, fittings, and hangers for Texas commercial jobs.',
    category: 'Takeoff',
    repo: 'miniauto/pipe-texas',
    repoUrl: 'https://github.com/miniauto/miniauto.github.io',
    lines: 961,
    sizeKb: 128,
    lastUpdate: 'Sep 8',
    updatesPerWeek: 2.0,
    shots: [
      { title: 'Takeoff', bars: [90, 55, 40] },
      { title: 'Hang list', bars: [48, 72, 66] },
    ],
    versions: [
      { hash: '4c01d9', shipped: 'Aug 12', note: 'Straight counts only' },
      { hash: '91be04', shipped: 'Sep 4', note: 'Hangers and fittings' },
    ],
    reviewsByHash: {
      '4c01d9': [
        {
          author: 'Chris D.',
          rating: 3,
          text: 'Counts pipe. Misses hangers, so I still finish in a notebook.',
          date: 'Aug 14',
        },
      ],
      '91be04': [
        {
          author: 'Chris D.',
          rating: 5,
          text: 'Finally matches how we actually count pipe in the field.',
          date: 'Sep 10',
        },
        {
          author: 'Priya S.',
          rating: 4,
          text: 'Good counts. Wish hangers defaulted to our shop standard.',
          date: 'Sep 7',
        },
      ],
    },
  },
  {
    id: 'bid-tooling',
    name: 'Bid Tooling',
    initials: 'BT',
    description: 'Keep every estimate in one place and see which ones you won.',
    category: 'Office',
    repo: 'miniauto/bid-tooling',
    repoUrl: 'https://github.com/miniauto/miniauto.github.io',
    lines: 720,
    sizeKb: 94,
    lastUpdate: 'Sep 5',
    updatesPerWeek: 1.3,
    shots: [{ title: 'Board', bars: [60, 30, 78] }],
    versions: [{ hash: 'c08e2d', shipped: 'Sep 1', note: 'First board' }],
    reviewsByHash: {
      c08e2d: [
        {
          author: 'Nate P.',
          rating: 4,
          text: 'Cleaner than our shared folder of PDFs.',
          date: 'Sep 5',
        },
      ],
    },
  },
  {
    id: 'car-wash-calc',
    name: 'Car Wash Calculator',
    initials: 'CW',
    description: 'Price a wash package from bay count, labor, and chemical cost.',
    category: 'Pricing',
    repo: 'miniauto/car-wash-calculator',
    repoUrl: 'https://github.com/miniauto/miniauto.github.io',
    lines: 538,
    sizeKb: 71,
    lastUpdate: 'Sep 9',
    updatesPerWeek: 2.7,
    shots: [
      { title: 'Inputs', bars: [40, 65, 50] },
      { title: 'Price', bars: [85, 28, 44] },
    ],
    versions: [
      { hash: '0aa173', shipped: 'Aug 25', note: 'Labor only' },
      { hash: 'e17a60', shipped: 'Sep 2', note: 'Chemicals added' },
    ],
    reviewsByHash: {
      '0aa173': [
        {
          author: 'Elena V.',
          rating: 2,
          text: 'Without chemical cost this number is make-believe.',
          date: 'Aug 26',
        },
      ],
      e17a60: [
        {
          author: 'Jordan M.',
          rating: 5,
          text: 'Showed this to an owner and they changed their weekend special on the spot.',
          date: 'Sep 9',
        },
        {
          author: 'Elena V.',
          rating: 3,
          text: 'Better. The chemical cost still feels high for our supplier.',
          date: 'Sep 4',
        },
      ],
    },
  },
  {
    id: 'count-tooling',
    name: 'Count Tooling',
    initials: 'CT',
    description: 'A one-screen quantity takeoff for people who hate takeoff software.',
    category: 'Takeoff',
    repo: 'miniauto/count-tooling',
    repoUrl: 'https://github.com/miniauto/miniauto.github.io',
    lines: 214,
    sizeKb: 36,
    lastUpdate: 'Sep 11',
    updatesPerWeek: 3.0,
    shots: [{ title: 'Count', bars: [55, 55, 55] }],
    versions: [{ hash: '44d1ab', shipped: 'Sep 11', note: 'First screen' }],
    reviewsByHash: {
      '44d1ab': [],
    },
  },
]
