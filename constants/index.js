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
    name: 'Chrome',
    link:'https://chrome.google.com/webstore/detail/passwall-free-password-ma/blaiihhmnjllkfnkmkidahhegbmlghmo'
  },
  {
    name: 'Firefox',
    link:'https://addons.mozilla.org/en-US/firefox/addon/passwall-free-password-manager/'
  },
  {
    name: 'MacOS',
    link:'https://passwall-downloads.s3.eu-central-1.amazonaws.com/1.0.3/PassWall-MacOS-1.0.3-amd64.dmg'
  },
  {
    name: 'Windows',
    link: 'https://passwall-downloads.s3.eu-central-1.amazonaws.com/1.0.3/Passwall-Windows-1.0.3.x64.exe'
  },
  {
    name: 'Linux',
    link: 'https://passwall-downloads.s3.eu-central-1.amazonaws.com/1.0.3/PassWall-Linux-1.0.3-amd64.deb'
  }
]

export const COMING_SOON = [
  {
    name: 'IOS',
    link: '#'
  },
  {
    name: 'Android',
    link: '#'
  },
  {
    name: 'Safari',
    link: '#'
  }
]

export const FREE_TIER = [
  {
    name: 'Up to 250 Logins',
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
    name: '14 days free trial',
    icon: Icons.BadgeCheck
  },
  {
    name: 'Everything in free',
    icon: Icons.BadgeCheck
  },
  {
    name: 'Unlimited Logins',
    icon: Icons.BadgeCheck
  },
  {
    name: 'Emails, Notes, Servers',
    icon: Icons.Mail
  },
  {
    name: 'Credit Cards, Bank Accounts',
    icon: Icons.CreditCard
  }
]
