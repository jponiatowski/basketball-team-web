import { groq } from 'next-sanity';
import { LINK_FRAGMENT } from './fragments';

export const navigationQuery = groq`*[_type == "navigation"][0] {
  logo,
  title,
  items[] {
    _type == "link" => {
      _type,
      label,
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
    },
    _type == "subItems" => {
      _type,
      label,
      items[] {
        _type == "item" => {
          _type,
          label,
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
        },
        _type == "subItems" => {
          _type,
          label,
          items[] {
            _type,
            label,
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
          }
        }
      }
    }
  }
}`;

export const headerQuery = groq`*[_type == "navigation"][0] {
  title,
  logo {
    asset-> {
      url,
      ...metadata {
        lqip
      }
    }
  }
}`;

export const sponsorsQuery = groq`*[_type == "sponsor"] {
  type,
  name,
  ${LINK_FRAGMENT},
  image {
    asset-> {
      url,
      ...metadata {
        lqip
      }
    }
  },
}`;

export const footerQuery = groq`*[_type == "footer"][0] {
  footerCopyright,
  socialMediaLinks-> {
    title,
    "items": socialMediaLinks[] {
      media,
      ${LINK_FRAGMENT}
    }
  }
}`;

export const teamQuery = groq`*[_type == "team" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  image {
    asset-> {
      url,
      ...metadata {
        lqip
      }
    }
  },
  coach[]-> {
    _id,
    name,
    slug,
    image {
      asset-> {
        url,
        ...metadata {
          lqip
        }
      }
    }
  },
  practice[] {
    day,
    details[] {
      time,
      place
    }
  },
  esorData {
    leagueId,
    teamId
  },
}`;

export const teamSeoQuery = groq`*[_type == "team" && slug.current == $slug][0] {
  seo {
    title,
    description,
    image {
      asset-> {
        url
      }
    }
  }
}`;
