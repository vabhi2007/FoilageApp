import ApolloWrapper from "./apollowrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foliage",
  description: "Careers and internships for students",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the children with the ApolloWrapper */}
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
