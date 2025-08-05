import { groq } from "next-sanity";

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
