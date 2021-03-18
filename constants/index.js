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
    link:'https://passwall-downloads.s3.eu-central-1.amazonaws.com/PassWall-MacOS-1.0.1.dmg'
  },
  {
    name: 'Windows',
    link: 'https://passwall-downloads.s3.eu-central-1.amazonaws.com/PassWall-Windows-1.0.1.exe'
  },
  {
    name: 'Linux',
    link: 'https://passwall-downloads.s3.eu-central-1.amazonaws.com/PassWall-Linux-1.0.1-amd64.deb'
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
