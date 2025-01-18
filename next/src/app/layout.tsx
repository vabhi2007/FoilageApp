import ApolloWrapper from "./apollowrapper";

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
