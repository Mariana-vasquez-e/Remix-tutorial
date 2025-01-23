////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar:
      "https://www.tiendanimal.es/articulos/wp-content/uploads/2021/12/raza-van-turco.jpg",
    first: "Gato",
    last: "Van Turco",
    twitter: "@gatovanturco",
  },
  {
    avatar:
      "https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/VWG5YLUQP5FHFGVU4PQK2QTU3U.jpg",
    first: "Gato",
    last: "Siames",
    twitter: "@gatosiames",
  },
  {
    avatar:
      "https://images.ctfassets.net/denf86kkcx7r/15HC92CcCjQEg7U14aZkVM/914db181ce7e407bc2a0220436a32aa4/un_gato_persa-39",
    first: "Gato",
    last: "Persa",
    twitter: "@gatopersa",
  },
  {
    avatar:
      "https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Sphynx.jpg?itok=oUrAvazr",
    first: "Gato",
    last: "Esfinge",
    twitter: "@gatoesfinge",
  },
  {
    avatar:
      "https://www.purina.es/sites/default/files/styles/ttt_image_original/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Burmese-Cat.webp?itok=kMqwSdrj",
    first: "Gato",
    last: "Burmes",
    twitter: "@gatoburmes",
  },
  {
    avatar:
      "https://www.purina.es/sites/default/files/styles/ttt_image_original/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Munchkin.webp?itok=qxw4sj2d",
    first: "Gato",
    last: "Munchkin",
    twitter: "@gatomunchkin",
  },
  {
    avatar:
      "https://wroooses.wordpress.com/wp-content/uploads/2017/02/gatoorientalf.jpg?w=663&h=663",
    first: "Gato",
    last: "Oriental",
    twitter: "@gatooriental",
  },
  {
    avatar:
      "https://www.zooplus.es/magazine/wp-content/uploads/2017/10/AdobeStock_20494285.jpeg",
    first: "Gato",
    last: "Abisinio",
    twitter: "@gatoabisinio",
  },
  {
    avatar:
      "https://www.purina.es/sites/default/files/styles/ttt_image_original/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Bombay.2.webp?itok=LbLkwYwx",
    first: "Gato",
    last: "Bombay",
    twitter: "@gatobombay",
  },
  {
    avatar:
      "https://miauu.mx/wp-content/uploads/2022/08/gato_bengali_.webp",
    first: "Gato",
    last: "Bengali",
    twitter: "@gatobengali",
  },
  
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
  });
});
