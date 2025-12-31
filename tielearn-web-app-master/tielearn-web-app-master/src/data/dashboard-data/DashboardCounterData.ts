interface DataType {
   id: number;
   icon: string;
   count: number;
   title: string;
}[];

const dashboard_count_data: DataType[] = [
   {
      id: 1,
      icon: "TieLearn -book",
      count: 30,
      title: "ENROLLED COURSES",
   },
   {
      id: 2,
      icon: "TieLearn -tutorial",
      count: 10,
      title: "ACTIVE COURSES",
   },
   {
      id: 3,
      icon: "TieLearn -diploma-1",
      count: 7,
      title: "COMPLETED COURSES",
   },
   {
      id: 4,
      icon: "TieLearn -group",
      count: 160,
      title: "TOTAL STUDENTS",
   },
   {
      id: 5,
      icon: "TieLearn -notepad",
      count: 30,
      title: "TOTAL COURSES",
   },
   {
      id: 6,
      icon: "TieLearn -dollar-currency-symbol",
      count: 29000,
      title: "TOTAL EARNINGS",
   },
];

export default dashboard_count_data;