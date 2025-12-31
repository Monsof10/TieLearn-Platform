interface DataType {
  id: number;
  page: string;
  question: string;
  answer: string;
  class_name?: string;
}
[];

const faq_data: DataType[] = [
  {
    id: 1,
    page: 'home_1',
    question: "Qu'est-ce qui fait de TieLearn  le meilleur choix ?",
    answer:
      'TieLearn  vous propose une formation de haute qualité axée sur la pratique à un prix compétitif. Vous bénéficierez d’un accompagnement complet, développant des compétences numériques recherchées, grâce à une expérience immersive et des études pratiques.',
  },
  {
    id: 2,
    page: 'home_1',
    question:
      'Puis-je utiliser le certificat de TieLearn  pour trouver un emploi ?',
    class_name: 'collapsed',
    answer:
      "Oui, TieLearn  délivre un certificat agréé par l'État, ce qui vous ouvre des portes vers de nombreuses opportunités professionnelles, que ce soit avec des entreprises nationales et internationales ou pour lancer votre propre projet. Notre certificat est reconnu et valorisé sur le marché du travail.",
  },
  {
    id: 3,
    page: 'home_1',
    question: 'TieLearn  propose-t-il des stages après la formation ?',
    class_name: 'collapsed',
    answer:
      'Oui, nous vous offrons un stage avec l’un de nos partenaires, vous permettant ainsi d’appliquer vos compétences dans un environnement de travail réel.  Cela vous permettra de constituer un portefeuille complet et d’entamer votre carrière avec une base solide et des expériences concrètes.',
  },
  {
    id: 4,
    page: 'home_1',
    question: 'Les cours de TieLearn  sont-ils flexibles ?',
    class_name: 'collapsed',
    answer:
      'Oui, nous proposons des cours flexibles qui s’adaptent à votre emploi du temps, avec des sessions en ligne et en présentiel selon vos disponibilités.',
  },
];

export default faq_data;
