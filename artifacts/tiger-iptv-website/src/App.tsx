import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { IpBlockScreen } from '@/components/IpBlockScreen';
import { useIpCheck } from '@/hooks/useIpCheck';

import Home from '@/pages/Home';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Contact from '@/pages/Contact';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppInner() {
  const { loading, blocked } = useIpCheck();

  if (loading) {
    // Minimal loading — invisible to user (fast check)
    return null;
  }

  if (blocked) {
    return <IpBlockScreen />;
  }

  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Layout>
        <Router />
      </Layout>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <AppInner />
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
