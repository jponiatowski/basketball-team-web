import { groq } from 'next-sanity';

export const LINK_FRAGMENT = groq`
 link {
    _type,
    text,
    type,
    internalLink-> {
      slug
    },
    url,
    email,
    phone,
    value,
    blank,
    parameters,
    anchor
}
`;
