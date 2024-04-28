import MUIThemeProvider from "@src/components/providers/MUIThemeProvider";
import "../styles/global.css";
import Page from "@src/components/Page";
import TanstackQueryProvider from "@src/components/providers/TanstackQueryProvider";
import ReduxProvider from "@src/components/providers/ReduxProvider";
import AuthorizationProvider from "@src/components/providers/AuthorizationProvider";

export const metadata = {
  title: "Timesheet Management",
};

export default function RootLayout({ children }) {
  return (
    <MUIThemeProvider>
      <ReduxProvider>
        <TanstackQueryProvider>
          <AuthorizationProvider>
            <html lang="en">
              <body>
                <Page>{children}</Page>
              </body>
            </html>
          </AuthorizationProvider>
        </TanstackQueryProvider>
      </ReduxProvider>
    </MUIThemeProvider>
  );
}
