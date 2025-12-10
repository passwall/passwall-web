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
  },
  Privacy: {
    path: '/privacy',
    name: 'Privacy Policy',
    external: false
  },
  Recover: {
    path: 'https://signup.passwall.io/recover-delete',
    name: 'Recover Delete',
    external: true
  }
}

export const DOWLOAD_LINKS = [
  {
    name: 'Chrome',
    link: 'https://chrome.google.com/webstore/detail/passwall-free-password-ma/blaiihhmnjllkfnkmkidahhegbmlghmo'
  },
  {
    name: 'Firefox',
    link: 'https://addons.mozilla.org/en-US/firefox/addon/passwall-free-password-manager/'
  },
  {
    name: 'Desktop',
    link: 'https://github.com/passwall/passwall-desktop/releases/latest'
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
    name: '7 days free trial',
    icon: Icons.BadgeCheck
  },
  {
    name: 'Unlimited Logins',
    icon: Icons.Key
  },
  {
    name: 'Emails, Notes, Servers',
    icon: Icons.Mail
  },
  {
    name: 'Credit Cards, Bank Accounts',
    icon: Icons.CreditCard
  },
  {
    name: 'Multi Platform: iOS, Android, Chrome',
    icon: Icons.CloudDownload
  },

]
