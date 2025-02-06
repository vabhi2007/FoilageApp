import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Person1 from "../app/assets/person1.jpg";
import Person2 from "../app/assets/person2.jpg";
import Person3 from "../app/assets/person3.jpg";
import Person4 from "../app/assets/person4.jpg";
import Company1 from "../app/assets/company1.png"
import Company2 from "../app/assets/company2.png"
import Company3 from "../app/assets/company3.png"
import Company4 from "../app/assets/company4.png"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const studentTestimonials = [
    {
      quote:
        "I always loved coding but had no idea how to get real-world experience. Thanks to Foliage, I landed an internship at a local tech startup. It gave me the confidence to pursue computer science in college!",
      name: "Jordan Mason",
      designation: "Aspiring Software Engineer",
      src: Person1,
    },
    {
      quote:
        "I was passionate about biology but didn’t know where to find hands-on research opportunities. Foliage connected me with a summer internship at a university lab. Now, I know research is the path I want to take!",
      name: "Elisa Smith",
      designation: "Future Biomedical Researcher",
      src: Person2,
    },
    {
      quote:
        "I wanted to gain real marketing experience before college, but finding an opportunity was tough. Through Foliage, I joined a startup’s marketing team. It gave me an edge in my business applications!",
      name: "Deebo Samuel",
      designation: "Business & Marketing Enthusiast",
      src: Person3,
    },
    {
      quote:
        "I love designing and building things, but I didn’t have connections in the industry. Foliage helped me find an internship at an engineering firm. It was my first step toward a career in mechanical engineering!",
      name: "James Kim",
      designation: "Future Engineer",
      src: Person4,
    },
  ]

  export const companyTestimonials = [
    {
      quote:
        "We wanted young talent for web development, and Foliage connected us with Ava. She optimized our front-end UI and made a real impact!",
      name: "Sarah Chen",
      designation: "CodeSpark Tech",
      src: Company1,
    },
    {
      quote:
        "We wanted to mentor young engineers, and Foliage introduced us to Ethan. He quickly contributed to 3D modeling and prototyping!",
      name: "Michael Rodriguez",
      designation: "Precision Engineering Co.",
      src: Company2,
    },
    {
      quote:
        "Finding passionate high school interns was tough until Foliage helped us recruit Jordan. He assisted with genetic data analysis and excelled!",
      name: "Emily Watson",
      designation: "GeneX BioLabs",
      src: Company3,
    },
    {
      quote:
        "As a startup, we needed fresh ideas. Thanks to Foliage, Samantha boosted our social media campaigns and improved engagement!",
      name: "James Kim",
      designation: "BrightPath Marketing",
      src: Company4,
    },
  ]