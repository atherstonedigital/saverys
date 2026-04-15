export const siteConfig = {
  name: "Savery's of Broadway",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://saverys.co.uk',
  description:
    'Luxury interior design studio rooted in the Cotswolds since 1991. Bespoke interiors, hand upholstery, premium fabrics, and expert design across Broadway, Ludlow, and Chelsea.',
  foundingDate: '1991',
  email: 'studio@saverys.co.uk',
  instagram: 'https://www.instagram.com/saverysofbroadway/',
  locations: {
    broadway: {
      name: "Savery's of Broadway",
      street: 'Cotswold Design Centre, Kennel Lane',
      locality: 'Broadway',
      region: 'Worcestershire',
      postcode: 'WR12 7DJ',
      country: 'GB',
      phone: '01386 858 941',
      phoneTel: '+441386858941',
      lat: 52.0355,
      lng: -1.8562,
    },
    ludlow: {
      name: "Savery's of Broadway \u2014 Ludlow",
      street: '1 Tower Street',
      locality: 'Ludlow',
      region: 'Shropshire',
      postcode: 'SY8 1RL',
      country: 'GB',
      phone: '01584 708 381',
      phoneTel: '+441584708381',
      lat: 52.3678,
      lng: -2.7182,
    },
    chelsea: {
      name: "Savery's of Broadway \u2014 Chelsea",
      street: 'Suite 9, 405 Kings Road',
      locality: 'Chelsea, London',
      region: 'London',
      postcode: 'SW10 0BB',
      country: 'GB',
      phone: '020 3668 1000',
      phoneTel: '+442036681000',
      lat: 51.4834,
      lng: -0.1803,
    },
  },
} as const;

export type LocationKey = keyof typeof siteConfig.locations;
