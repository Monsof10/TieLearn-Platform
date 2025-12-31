import { StaticImageData } from 'next/image';

import icon_1 from '@/assets/img/icons/features_icon01.svg';
import icon_2 from '@/assets/img/icons/features_icon02.svg';
import icon_3 from '@/assets/img/icons/features_icon03.svg';
import icon_4 from '@/assets/img/icons/features_icon04.svg';
import homefFeature_1 from '@/assets/img/icons/h4_features_icon01.svg';
import homefFeature_2 from '@/assets/img/icons/h4_features_icon02.svg';
import homefFeature_3 from '@/assets/img/icons/h4_features_icon03.svg';

interface DataType {
  id: number;
  page: string;
  icon?: StaticImageData;
  icon_2?: string;
  icon_3?: string;
  title: string;
  desc: string;
}
[];

const feature_data: DataType[] = [
  {
    id: 1,
    page: 'home_1',
    icon: icon_1,
    title: 'Formation Immersif',
    desc: 'Apprentissage qui combine théorie et pratique',
  },
  {
    id: 2,
    page: 'home_1',
    icon: icon_2,
    title: 'Sessions Flexibles',
    desc: 'Des cours en ligne ou en présentiel adaptés à votre emploi du temps',
  },
  {
    id: 3,
    page: 'home_1',
    icon: icon_3,
    title: "Certificat Reconnu par l'État",
    desc: 'Un certificat pour valoriser vos compétences',
  },
  {
    id: 4,
    page: 'home_1',
    icon: icon_4,
    title: 'Opportunités de Stage',
    desc: 'Des stages pour appliquer vos compétences dans le monde du travail',
  },

  // home_2

  {
    id: 1,
    page: 'home_2',
    icon_2: '/assets/img/icons/h2_features_icon01.svg',
    title: 'Tuteurs Experts',
    desc: 'quand un imprimeur inconnu prit une galère de type et la brouilla pour faire.',
  },

  {
    id: 2,
    page: 'home_2',
    icon_2: '/assets/img/icons/h2_features_icon02.svg',
    title: 'Cours Efficaces',
    desc: 'quand un imprimeur inconnu prit une galère de type et la brouilla pour faire.',
  },

  {
    id: 3,
    page: 'home_2',
    icon_2: '/assets/img/icons/h2_features_icon03.svg',
    title: 'Obtenir un Certificat',
    desc: 'quand un imprimeur inconnu prit une galère de type et la brouilla pour faire.',
  },

  // home_3

  {
    id: 1,
    page: 'home_3',
    icon_2: 'assets/img/icons/h3_features_icon01.svg',
    title: 'Scholarship Facility',
    desc: 'Eestuidar University we prepare you to launch your.',
  },
  {
    id: 2,
    page: 'home_3',
    icon_2: 'assets/img/icons/h3_features_icon02.svg',
    title: 'Learn From Experts',
    desc: 'Eestuidar University we prepare you to launch your.',
  },
  {
    id: 3,
    page: 'home_3',
    icon_2: 'assets/img/icons/h3_features_icon03.svg',
    title: 'Graduation Courses',
    desc: 'Eestuidar University we prepare you to launch your.',
  },
  {
    id: 4,
    page: 'home_3',
    icon_2: 'assets/img/icons/h3_features_icon04.svg',
    title: 'Certificate Program',
    desc: 'Eestuidar University we prepare you to launch your.',
  },

  // home_4

  {
    id: 1,
    page: 'home_4',
    icon: homefFeature_1,
    title: 'Soutien & Motivation',
    desc: 'Nous sommes capables d\'offrir chaque formation de yoga expérimentée et le meilleur entraîneur de yoga.',
  },
  {
    id: 2,
    page: 'home_4',
    icon: homefFeature_2,
    title: 'Vie Corporelle Forte',
    desc: 'Nous sommes capables d\'offrir chaque formation de yoga expérimentée et le meilleur entraîneur de yoga.',
  },
  {
    id: 3,
    page: 'home_4',
    icon: homefFeature_3,
    title: 'Flexibilité Accrue',
    desc: 'Nous sommes capables d\'offrir chaque formation de yoga expérimentée et le meilleur entraîneur de yoga.',
  },

  // home-five

  {
    id: 1,
    page: 'home_5',
    icon_3: '/assets/img/others/h5_features_item_shape02.svg',
    icon_2: 'TieLearn -video-tutorial',
    title: 'Classe Facile',
    desc: 'Cher Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore',
  },
  {
    id: 2,
    page: 'home_5',
    icon_3: '/assets/img/others/h5_features_item_shape02.svg',
    icon_2: 'TieLearn -verified',
    title: 'Sécurité & Sûreté',
    desc: 'Cher Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore',
  },
  {
    id: 3,
    page: 'home_5',
    icon_3: '/assets/img/others/h5_features_item_shape02.svg',
    icon_2: 'TieLearn -instructor',
    title: 'Enseignant Compétent',
    desc: 'Cher Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore',
  },
  {
    id: 4,
    page: 'home_5',
    icon_3: '/assets/img/others/h5_features_item_shape02.svg',
    icon_2: 'TieLearn -book-1',
    title: 'Programme Propre',
    desc: 'Cher Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore',
  },

  // home_8

  {
    id: 1,
    page: 'home_8',
    icon_3: '/assets/img/others/h5_features_item_shape02.svg',
    icon_2: 'TieLearn -book-1',
    title: 'Apprenez des compétences avec 120k+',
    desc: 'cours vidéo.',
  },
  {
    id: 2,
    page: 'home_8',
    icon_3: '/assets/img/others/h5_features_item_shape02.svg',
    icon_2: 'TieLearn -instructor',
    title: 'Choisissez des cours',
    desc: 'experts du monde réel.',
  },
  {
    id: 3,
    page: 'home_8',
    icon_3: '/assets/img/others/h5_features_item_shape02.svg',
    icon_2: 'TieLearn -tutorial',
    title: 'Tuteurs Professionnels',
    desc: 'cours vidéo.',
  },
  {
    id: 4,
    page: 'home_8',
    icon_3: '/assets/img/others/h5_features_item_shape02.svg',
    icon_2: 'TieLearn -graduated',
    title: 'Diplômes en Ligne',
    desc: 'Étudiez de manière flexible en ligne',
  },
];

export default feature_data;
