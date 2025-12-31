interface MenuItem {
  id: number;
  title: string;
  link: string;
  menu_class?: string;
  home_sub_menu?: {
    menu_details: {
      link: string;
      title: string;
      badge?: string;
      badge_class?: string;
    }[];
  }[];
  sub_menus?: {
    link: string;
    title: string;
    dropdown?: boolean;
    mega_menus?: {
      link: string;
      title: string;
    }[];
  }[];
}

const menu_data: MenuItem[] = [
  {
    id: 1,
    title: 'Accueil',
    link: '/',
    menu_class: 'mega-menu',
    home_sub_menu: [
      {
        menu_details: [
          { link: '/', title: 'Main Home' },
          {
            link: '/home-two',
            title: 'Online Course',
            badge_class: 'tg-badge',
            badge: 'Hot',
          },
          {
            link: '/home-three',
            title: 'University',
            badge_class: 'tg-badge-two',
            badge: 'New',
          },
          {
            link: '/home-four',
            title: 'Yoga Instructor',
            badge_class: 'tg-badge-two',
            badge: 'New',
          },
          {
            link: '/home-five',
            title: 'Kindergarten',
            badge_class: 'tg-badge',
            badge: 'Hot',
          },
        ],
      },
      {
        menu_details: [
          {
            link: '/home-six',
            title: 'Language Academy',
            badge_class: 'tg-badge-two',
            badge: 'New',
          },
          {
            link: '/home-seven',
            title: 'Business Coach',
            badge_class: 'tg-badge-two',
            badge: 'New',
          },
          {
            link: '/home-eight',
            title: 'Kitchen Coach',
            badge_class: 'tg-badge',
            badge: 'Hot',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Catalogue',
    link: '#',
    sub_menus: [
      { link: '/courses/design-graphique', title: 'Design Graphique' },
      { link: '/courses/marketing-digital', title: 'Marketing Digital' },
      { link: '/courses/developpement', title: 'Developpement' },
      { link: '/courses/microsoft-office', title: 'Microsoft Office' },
      { link: '/courses/ux-ui', title: 'UX/UI' },
    ],
  },
  {
    id: 3,
    title: 'À propos',
    link: '/about',
    // Removed sub_menus to disable dropdown
  },
  {
    id: 4,
    title: 'Contact',
    link: '/contact',
  },
];

export default menu_data;
