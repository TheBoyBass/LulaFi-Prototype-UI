import ProviderSearchScreen from "@/screens/ProviderSearchScreen";

/** Discover reuses the Service Search experience */
const MessagesScreen = () => (
  <ProviderSearchScreen
    tab="discover"
    title="Discover"
    subtitle="Browse banks, municipalities and government services"
    showBack={false}
  />
);

export default MessagesScreen;
