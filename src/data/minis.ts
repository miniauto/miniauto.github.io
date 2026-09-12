import type { MiniApp } from '../types'

export const STARTERS: MiniApp[] = [
  {
    id: 'click-tooling',
    name: 'Click Tooling',
    initials: 'CL',
    description: 'Track plumbing work across every project and crew you run.',
    category: 'Trade',
    repo: 'clickconstruction/pipetooling.github.io',
    repoUrl: 'https://github.com/clickconstruction/pipetooling.github.io',
    openUrl: 'https://clicktooling.com/',
    lines: 948083,
    sizeKb: 97556,
    updatedAt: '2026-09-12',
    updatesPerWeek: 233.3,
    why:
      'Most plumbing software makes you pick a side: estimating or running the work. ' +
      'This keeps the bid, the job, the crew, and the invoice in one place, so the number ' +
      'you priced is the number you get paid on.',
    bestFor: [
      'Master plumbers running more than one crew',
      'Estimators who have to defend a number months later',
      'Office staff chasing job costs and receivables',
    ],
    features: [
      {
        name: 'Nine real roles',
        note: 'A helper, an estimator, and a controller each get a different app. It is enforced in the database, not just hidden in the interface.',
      },
      {
        name: 'Bid room',
        note: 'Fourteen tabs of one bid, so the takeoff, labor, and terms stay attached to the number you actually sent.',
      },
      {
        name: 'Customer portal',
        note: 'Customers accept an estimate and sign a contract themselves, instead of trading PDFs over email.',
      },
      {
        name: 'Dispatch mode',
        note: 'A stripped-down screen for moving crews around on the day, kept separate from the planning views.',
      },
      {
        name: 'Job tally',
        note: 'Tracks what a job should pay against what it did, down to crew hours, days, and last day.',
      },
    ],
    screenshots: [],
    versions: [{ hash: '8dc6c42', shipped: '2026-09-12', note: 'pipeline crew names' }],
    reviewsByHash: { '8dc6c42': [] },
  },
  {
    id: 'count-tooling',
    name: 'Count Tooling',
    initials: 'CT',
    description: 'A one-screen quantity takeoff for people who hate takeoff software.',
    category: 'Takeoff',
    repo: 'clickconstruction/counttooling.github.io',
    repoUrl: 'https://github.com/clickconstruction/counttooling.github.io',
    openUrl: 'https://counttooling.com/',
    lines: 106362,
    sizeKb: 61679,
    updatedAt: '2026-09-10',
    updatesPerWeek: 33.3,
    why:
      'Takeoff software is normally a desktop purchase and a training course. ' +
      'This counts fixtures and measures runs straight off a plan PDF in the browser, ' +
      'with nothing to install and no connection needed.',
    bestFor: [
      'Estimators counting fixtures off plan PDFs',
      'Small shops that cannot justify desktop takeoff software',
      'Anyone marking up drawings on a tablet in the field',
    ],
    features: [
      {
        name: 'Works offline',
        note: 'Open a drawing and keep counting with no connection, on whatever device you already carry.',
      },
      {
        name: 'Any plan PDF',
        note: 'Set the scale once, then count and measure directly on the sheet.',
      },
      {
        name: 'Exports you can hand over',
        note: 'Reports come out as clean documents rather than a screenshot of a tool.',
      },
    ],
    screenshots: [
      {
        src: '/shots/count-tooling/home.png',
        alt: 'Count Tooling home page showing a plan sheet with counted fixtures',
        caption: 'Counters and a scaled sheet, in the browser.',
      },
    ],
    versions: [{ hash: '4efc3c4', shipped: '2026-09-10', note: 'tutorial and tour fixes' }],
    reviewsByHash: { '4efc3c4': [] },
  },
  {
    id: 'takeoff-tooling',
    name: 'Takeoff Tooling',
    initials: 'TT',
    description: 'Take off an electrical job without the usual takeoff software.',
    category: 'Takeoff',
    repo: 'clickconstruction/takeofftooling.github.io',
    repoUrl: 'https://github.com/clickconstruction/takeofftooling.github.io',
    openUrl: 'https://takeofftooling.com/',
    lines: 32724,
    sizeKb: 38947,
    updatedAt: '2026-09-08',
    updatesPerWeek: 14.0,
    why:
      'Electrical takeoff means counting lighting, gear, devices, boxes, and conduit and ' +
      'pricing every run. This does it in the browser against your own labor and price book, ' +
      'so the estimate reflects your rates instead of a vendor default.',
    bestFor: [
      'Electrical estimators building a bid from a plan',
      'Shops that keep their own labor and material rates',
      'Anyone already counting in Count Tooling who needs to price it',
    ],
    features: [
      {
        name: 'Real item types',
        note: 'Lighting, gear, devices, boxes and covers, conduit, and trenching, not one generic line item.',
      },
      {
        name: 'Your labor and price book',
        note: 'Prices come from a book you control, with a way to update supplier prices in bulk.',
      },
      {
        name: 'Pastes in from Count Tooling',
        note: 'Bring counts straight over from CountTooling.com and hand results off to PipeTooling.',
      },
      {
        name: 'Cloud sync across devices',
        note: 'Sign in to carry a project between machines; a reload keeps your data.',
      },
    ],
    screenshots: [
      {
        src: '/shots/takeoff-tooling/home.png',
        alt: 'Takeoff Tooling worksheet with assembly, type, quantity, labor, and price columns',
        caption: 'An assembly worksheet you price against your own book.',
      },
    ],
    versions: [{ hash: 'e8d3c7c', shipped: '2026-09-08', note: 'takeoff review merge' }],
    reviewsByHash: { 'e8d3c7c': [] },
  },
  {
    id: 'charity-tooling',
    name: 'Charity Tooling',
    initials: 'CH',
    description: 'Donor management for charities that put 95% of every dollar into programs.',
    category: 'Charity',
    repo: 'charitytooling/charitytooling.github.io',
    repoUrl: 'https://github.com/charitytooling/charitytooling.github.io',
    openUrl: 'https://charitytooling.com/',
    lines: 17694,
    sizeKb: 1412,
    updatedAt: '2026-06-05',
    updatesPerWeek: 0,
    why:
      'Small charities get fundraising software that is priced for enterprises and optimized ' +
      'for asking, not for stewardship. This tracks donations and issues receipts for free ' +
      'until a charity grows, and only lists groups that spend at least 95% of every dollar ' +
      'on programs.',
    bestFor: [
      'Small charities that cannot justify a fundraising suite',
      'Donors who want to know a receipt is real',
      'Boards that care about the ratio of money reaching programs',
    ],
    features: [
      {
        name: 'A 95% floor',
        note: 'Only accepts groups spending 95%+ on qualifying distributions, versus Charity Navigator\u2019s 70% "give with confidence" line.',
      },
      {
        name: 'Verifiable receipts',
        note: 'A receipt from charitytooling.com links back to a page that confirms where the money went.',
      },
      {
        name: 'Free until it is not',
        note: 'No cost until a charity crosses a size threshold, so stewardship is not a paid feature.',
      },
    ],
    screenshots: [
      {
        src: '/shots/charity-tooling/home.png',
        alt: 'Charity Tooling receipt verification page with a donation receipt illustration',
        caption: 'A receipt you can trace back to where the money went.',
      },
    ],
    versions: [{ hash: '753950b', shipped: '2026-06-05', note: 'better archived handling' }],
    reviewsByHash: { '753950b': [] },
  },
  {
    id: 'daf-tooling',
    name: 'DAF Tooling',
    initials: 'DF',
    description: 'Explore every donor-advised fund sponsor in one dataset.',
    category: 'Charity',
    repo: 'charitytooling/daftooling.github.io',
    repoUrl: 'https://github.com/charitytooling/daftooling.github.io',
    openUrl: 'https://daftooling.com/',
    lines: 75000,
    sizeKb: 44657,
    updatedAt: '2026-05-23',
    updatesPerWeek: 0,
    why:
      'Donor-advised funds hold hundreds of billions of dollars, but the data is scattered ' +
      'across annual reports and IRS filings. This pulls it into one explorer you can filter, ' +
      'sort, and follow back to the source.',
    bestFor: [
      'Donors comparing where to open a fund',
      'Researchers and journalists tracking DAF assets and grants',
      'Advisors who need the numbers behind a sponsor',
    ],
    features: [
      {
        name: 'The whole field, filterable',
        note: '8,751 rows across 1,594 sponsors from 2019 to 2024, filterable by year, type, and subtype.',
      },
      {
        name: 'Numbers at scale',
        note: '$330B in end-of-year assets, $91B in contributions, and $66B in grants, laid out year by year.',
      },
      {
        name: 'Traceable to the source',
        note: 'Built on the NPT annual report and IRS BMF data, with links out to ProPublica\u2019s Nonprofit Explorer.',
      },
    ],
    screenshots: [
      {
        src: '/shots/daf-tooling/home.png',
        alt: 'DAF Sponsor Explorer with totals and a sortable table of fund sponsors',
        caption: 'Every sponsor, filterable, with the totals up top.',
      },
    ],
    versions: [{ hash: '88d4cdb', shipped: '2026-05-23', note: 'main merge' }],
    reviewsByHash: { '88d4cdb': [] },
  },
  {
    id: 'bid-tooling',
    name: 'Bid Tooling',
    initials: 'BT',
    description: 'A plumbing bid worksheet that prices a job from its fixture counts.',
    category: 'Office',
    repo: 'clickconstruction/bidtooling.github.io',
    repoUrl: 'https://github.com/clickconstruction/bidtooling.github.io',
    openUrl: 'https://bidtooling.com/',
    lines: 3227,
    sizeKb: 181,
    updatedAt: '2026-01-31',
    updatesPerWeek: 0,
    why:
      'A plumbing bid is a lot of small counts that have to add up the same way every time. ' +
      'This lays the whole worksheet on one page, from job details through fixture counts to ' +
      'the price, so nothing gets missed between the plan and the number.',
    bestFor: [
      'Plumbers pricing a bid off a set of plans',
      'Estimators who want one consistent worksheet every time',
      'Anyone tired of rebuilding the same spreadsheet per job',
    ],
    features: [
      {
        name: 'Fixture counts built in',
        note: 'Steppers for toilets, sinks, shower and tub combos, and the rest, grouped the way a plumber walks a bathroom.',
      },
      {
        name: 'One page, plan to price',
        note: 'Job information, fixture counts, added labor and materials, and pricing all live on a single sheet.',
      },
      {
        name: 'Fill with sample',
        note: 'A sample-fill and a clear-all make it quick to try, and it all runs in the browser.',
      },
    ],
    screenshots: [
      {
        src: '/shots/bid-tooling/home.png',
        alt: 'Bid Tooling worksheet with job information and fixture count steppers',
        caption: 'Job details and fixture counts on one worksheet.',
      },
    ],
    versions: [{ hash: '5df7683', shipped: '2026-01-31', note: 'bug fixes and cleanup' }],
    reviewsByHash: { '5df7683': [] },
  },
  {
    id: 'car-wash-calculator',
    name: 'Car Wash Calculator',
    initials: 'CW',
    description: 'Show a car wash how much water and sewer cost it is throwing away.',
    category: 'Pricing',
    repo: 'Click-Plumbing/carwashcalculator',
    repoUrl: 'https://github.com/Click-Plumbing/carwashcalculator',
    openUrl: 'https://carwashcalculator.com/',
    lines: 377,
    sizeKb: 4,
    updatedAt: '2025-09-16',
    updatesPerWeek: 0,
    why:
      'A car wash pays for water twice, once coming in and once going down the drain. This ' +
      'turns cars per day and the current water and sewer bills into what a reclaim system ' +
      'would save, in dollars a wash owner actually recognizes.',
    bestFor: [
      'Car wash owners weighing a water reclaim system',
      'Plumbers making the savings case to a wash',
      'Anyone arguing a sewer bill with their city',
    ],
    features: [
      {
        name: 'Bills in, savings out',
        note: 'Enter cars per day and the monthly water and sewer bills; it estimates what reclaim recovers.',
      },
      {
        name: 'A report to hand over',
        note: 'Produces a water savings report, not just a number on a screen.',
      },
      {
        name: 'The sewer petition angle',
        note: 'Frames the case for asking a city to drop the sewer charge for water that never enters the sewer.',
      },
    ],
    screenshots: [
      {
        src: '/shots/car-wash-calculator/home.png',
        alt: 'Car Wash Water Savings Calculator with cars per day and water and sewer bill inputs',
        caption: 'Cars per day and your bills, in; savings, out.',
      },
    ],
    versions: [{ hash: '5dc36be', shipped: '2025-09-16', note: 'push' }],
    reviewsByHash: { '5dc36be': [] },
  },
  {
    id: 'pay-tooling',
    name: 'Pay Tooling',
    initials: 'PY',
    description: 'Generate a contractor pay stub without a payroll subscription.',
    category: 'Office',
    repo: 'clickconstruction/paytooling.github.io',
    repoUrl: 'https://github.com/clickconstruction/paytooling.github.io',
    openUrl: 'https://paytooling.com/',
    lines: 2088,
    sizeKb: 26,
    updatedAt: '2025-05-16',
    updatesPerWeek: 0,
    why:
      'Paying a contractor should not require a payroll platform. This fills in a clean pay ' +
      'stub from a few fields, handles mileage, and can work an invoice backward, all in the ' +
      'browser.',
    bestFor: [
      'Small shops paying 1099 contractors',
      'Contractors who need a stub for their own records',
      'Anyone who just needs one document, not a subscription',
    ],
    features: [
      {
        name: 'Pay stub generator',
        note: 'Contractor and company details, pay period, amount, and mileage in, a finished stub out.',
      },
      {
        name: 'Reverse invoice',
        note: 'Works from a total backward when you have the number but not the line items.',
      },
      {
        name: 'Pre-fill links',
        note: 'Share a link that opens the form already filled in, and a sample-fill to try it fast.',
      },
    ],
    screenshots: [
      {
        src: '/shots/pay-tooling/home.png',
        alt: 'PayTooling pay stub generator with contractor information fields',
        caption: 'A pay stub from a few fields, mileage included.',
      },
    ],
    versions: [{ hash: 'f069c26', shipped: '2025-05-16', note: 'fixed a bug' }],
    reviewsByHash: { 'f069c26': [] },
  },
]
