import useTranslation from '@/localization/useTranslation';
import { TeamMember } from '@/types/team';

const useTeamData = () => {
  const t = useTranslation();

  const teamData: TeamMember[] = [
    {
      id: 1,
      name: `${t['Stanislav Goloborodov']}`,
      role: `${t['Frontend Developer']}`,
      bio: [
        `${t['Stanislav, an excellent example of a team player, but is also capable of working alone. He is detail-oriented, very hard-working and has extensive technical knowledge, while always being open to learning new tools and technologies.']}`,
      ],
      github: 'https://github.com/stanislavstranger',
      linkedin: 'https://www.linkedin.com/in/stanislav-goloborodov-a7510b259',
      photo: 'https://avatars.githubusercontent.com/u/119806888?v=4',
    },
    {
      id: 2,
      name: `${t['Uladzimir Milasheuski']}`,
      role: `${t['Frontend Developer']}`,
      bio: [
        `${t['Uladzimir is web developer with excellent communication skills  shows an outstanding ability to adapt to new technologies, which makes it an ideal candidate for projects that require implementation of new solutions.']}`,
      ],
      github: 'https://github.com/vladimirm89',
      linkedin: 'https://www.linkedin.com/',
      photo: 'https://avatars.githubusercontent.com/u/99201366?v=4',
    },
    {
      id: 3,
      name: `${t['Yevhenii Orhanistyi']}`,
      role: `${t['Frontend Developer']}`,
      bio: [
        `${t['Yevhenii is a passionate web developer, dedicated to delivering top-notch solutions that prioritize user experience, architectural soundness, and code quality. His multifaceted approach  makes him an asset to any project or team.']}`,
      ],
      github: 'https://github.com/yevheniiorhanistyi',
      linkedin: 'https://www.linkedin.com/in/yevhenii-orhanistyi-819094224',
      photo: 'https://avatars.githubusercontent.com/u/88982441?v=4',
    },
  ];

  return { teamData };
};

export default useTeamData;
