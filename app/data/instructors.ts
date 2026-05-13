export interface FilmographyItem {
  title: string;
  year?: string;
  role: string;
  link?: string;
  awards?: string[];
}

export interface Instructor {
  id: string;
  name: string;
  slug: string;
  born?: string;
  bio: string;
  longBio: string;
  expertise: string[];
  experience: string;
  filmography: FilmographyItem[];
  socials?: {
    youtube?: string;
    instagram?: string;
    vimeo?: string;
  };
  image?: string;
}

export const instructors: Instructor[] = [
  {
    id: 'amar-maharjan',
    name: 'Amar Maharjan',
    slug: 'amar-maharjan',
    born: '1993',
    bio: 'Amar Maharjan is a renowned filmmaker, writer, director, and cinematographer based in Kathmandu, Nepal. With a career spanning since 2015, he has mentored numerous aspiring filmmakers and contributed to iconic projects like Zyamaru.',
    longBio: `Amar Maharjan was born in Kathmandu, Nepal. He completed his schoolwork at Gajurmukhi secondary boarding school, did a computer diploma in Thapathali engineering college, and later attained bachelors in film studies from Oscar International College of Film Studies, Kathmandu Nepal where he completed his scriptwriting and direction in film making.

He is a renowned filmmaker, known for his expertise as a writer, director, and cinematographer. With a career spanning since 2015, he has passionately pursued his love for filmmaking. Amar works on his own film projects as a writer and director while lending his exceptional cinematography skills to other productions. He had been actively involved in the YouTube channel "Zyamaru" as a content creator. Amar's extensive experience and talent have led him to serve as a mentor in cinematography at the Film Colleges, and film institutes where he imparts his knowledge and inspires the next generation of filmmakers.`,
    expertise: ['Writer', 'Director', 'Cinematographer'],
    experience: 'He had done lots of short films and the documentary as a cinematographer and had completed lots of foreign project as a DIT, Camera assist, and as a Cinematographer. Such as Tata trust earthquake: Cinematographer (Documentary film), Camera assist, and DIT. A Year (short film), Camera assist. Black goat(short film). He had been Photographer and videographer in friendly hunting for the German magazine.',
    filmography: [
      {
        title: 'Heaven is black',
        year: '2015',
        role: 'Cinematographer (short film)',
        link: 'https://www.youtube.com/watch?v=RtT-3SuvekM&t=68s',
        awards: [
          'Audience Choice Award — Toronto Nepali Film Festival 2017',
          'Special Mention Award — KIMFF 2015',
          'Official Selection — Festival de cortometrajes PACAS 2016',
          'Official Selection — GEOFILMFESTIVAL & EXPOCINEMA 2017',
          'Official Selection — Tasveer South Asian Film Festival 2017',
        ],
      },
      {
        title: 'Vismrit',
        year: '2018',
        role: 'Cinematographer (feature-length film)',
        awards: [
          'Winner — DIY Film Festival 2018',
          'Winner — "Euro Kino" Czech International Independent Film Festival 2018',
          'Winner — Rejected Reels Film Festival 2018',
          'Official Selection — Derby Film Festival, Cinekasimanwa, Color Tape Intl. & more',
        ],
      },
      {
        title: 'Aina jhyal ko putali (Butterfly on the Windowpane)',
        year: '2020',
        role: 'Cinematographer (feature-length film)',
        link: 'https://www.youtube.com/watch?v=IkIbrVUeA-0',
        awards: [
          'Official Selection — Busan International Film Festival 2020',
          'Official Selection — 20th Dhaka International Film Festival 2022',
          'Official Selection — Festival International de Films de Fribourg',
          'Official Selection — 61st ZLINfilm Festival 2021',
          'In Competition — Asia Pacific Screen Awards',
        ],
      },
      {
        title: 'Dhyangro',
        year: '2019',
        role: 'Cinematographer (short film)',
        link: 'https://www.youtube.com/watch?v=guTROzW_R34&t=308s',
      },
      {
        title: 'A Brief Introduction to Himalayan Yew',
        role: 'Documentary',
        link: 'https://www.youtube.com/watch?v=flMJKBt02w',
      },
      {
        title: 'A Brief Introduction to Love Apple',
        role: 'Documentary',
        link: 'https://www.youtube.com/watch?v=NX0lOLVcJIA&t=1s',
      },
      {
        title: 'A Brief Introduction to Chiretta',
        role: 'Documentary',
        link: 'https://www.youtube.com/watch?v=dyqERo83p8s',
      },
      {
        title: 'Chakrawarti Hobi Law College',
        role: 'Cinematographer (TV commercial)',
        link: 'https://www.youtube.com/watch?v=zhuznqllLoE&t=1s',
      },
      {
        title: 'Sanima Bank',
        role: 'Cinematographer (Commercial)',
        link: 'https://www.youtube.com/watch?v=B6hyZt3twjc',
      },
      {
        title: 'Kaha Ma',
        role: 'Cinematographer (Music video)',
        link: 'https://www.youtube.com/watch?v=-cbCMAcIhvw',
      },
      {
        title: 'Soch',
        role: 'Cinematographer (Music video)',
        link: 'https://www.youtube.com/watch?v=GEp30uz08f4',
      },
      {
        title: 'Imagine Nepal',
        year: '2022',
        role: 'Cinematographer (Documentary series)',
        link: 'https://www.youtube.com/watch?v=gzrfnaYC7tQ&t=40s',
      },
    ],
    socials: {
      youtube: 'https://youtube.com/@zyamaru',
      instagram: '#',
      vimeo: '#',
    },
    image: '/instructor/Amar1675867366.jpg',
  },
];
