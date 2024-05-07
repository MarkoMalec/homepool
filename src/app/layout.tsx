import "~/styles/globals.css";
import { UserContextProvider } from "~/context/userContext";
import { prisma } from "~/lib/prisma";
import { UsersContextProvider } from "~/context/usersContext";
import { ThemeProvider } from "~/components/theme-provider";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "~/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import AddItemDialog from "~/components/Items/addItemDialog";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "HomePool",
  description: "Created by Marko Malec",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const users = await prisma.user.findMany({
    include: {
      checkedItems: true,
    },
  });

  // extremely annoying solution to TS complaining about Decimal
  const usersWithPriceAsString = users.map((user) => ({
    ...user,
    checkedItems: user.checkedItems.map((item) => ({
      ...item,
      price: item.price.toString(),
    })),
  }));

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} pt-[50px]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserContextProvider initialUser={session?.user}>
            <UsersContextProvider initialUsers={usersWithPriceAsString}>
              <Header />
              {children}
              <AddItemDialog sticky />
            </UsersContextProvider>
          </UserContextProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
