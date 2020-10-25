import * as Icons from 'heroicons-react'

export const THEME = {
  LIGHT: 'theme-light',
  DARK: 'theme-dark'
}

export const PAGES = {
  FeedBack: {
    path: 'https://passwall.typeform.com/to/GAv1h2',
    name: 'Give Feedback',
    external: true
  },
  Contact: {
    path: 'https://passwall.typeform.com/to/b2un6b',
    name: 'Contact',
    external: true
  },
  Community: {
    path: 'https://github.com/passwall',
    name: 'Community',
    external: true
  },
  Twitter: {
    path: 'https://twitter.com/pass_wall',
    name: 'Twitter',
    external: true
  }
}

export const DOWLOAD_LINKS = [
  {
    name: 'MacOS',
    link: 'https://github.com/passwall/passwall-desktop/releases/download/v1.0.0/PassWall-1.0.0.dmg'
  },
  {
    name: 'Linux (Soon)',
    link: '#'
  },
  {
    name: 'Windows (Soon)',
    link: '#'
  }
]

export const COMING_SOON = [
  {
    name: 'Chrome',
    link: '#'
  },
  {
    name: 'IOS',
    link: '#'
  },
  {
    name: 'Safari',
    link: '#'
  },
  {
    name: 'Windows',
    link: '#'
  },
  {
    name: 'Linux',
    link: '#'
  }
]

export const FREE_TIER = [
  {
    name: 'Logins',
    icon: Icons.Users
  },
  {
    name: 'Easy Import',
    icon: Icons.CloudDownload
  },
  {
    name: 'Free Updates',
    icon: Icons.Users
  }
]

export const PAID_TIER = [
  {
    name: 'Everything in free',
    icon: Icons.BadgeCheck
  },
  {
    name: 'Bank Accounts',
    icon: Icons.BadgeCheck
  },
  {
    name: 'Emails',
    icon: Icons.AtSymbol
  },
  {
    name: 'Private Notes',
    icon: Icons.ClipboardList
  },
  {
    name: 'Servers',
    icon: Icons.Terminal
  }
]
