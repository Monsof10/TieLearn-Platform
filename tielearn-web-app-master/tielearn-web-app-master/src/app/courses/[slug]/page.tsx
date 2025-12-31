import React from 'react';
import { useParams } from 'next/navigation';

import Developpement from '@/pages/courses/developpement';
import MicrosoftOffice from '@/pages/courses/microsoft-office';
import UxUi from '@/pages/courses/ux-ui';
import DesignGraphique from '@/pages/courses/design-graphique';
import MarketingDigital from '@/pages/courses/marketing-digital';

const courseComponents: { [key: string]: React.FC } = {
  'developpement': Developpement,
  'microsoft-office': MicrosoftOffice,
  'ux-ui': UxUi,
  'design-graphique': DesignGraphique,
  'marketing-digital': MarketingDigital,
};

const CoursePage = () => {
  const params = useParams() as { slug?: string | string[] } | null;

  if (!params || !params.slug) {
    return <div>Course not found</div>;
  }

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const CourseComponent = courseComponents[slug];

  if (!CourseComponent) {
    return <div>Course not found</div>;
  }

  return <CourseComponent />;
};

export default CoursePage;
