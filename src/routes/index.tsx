import { useTranslation } from "react-i18next";

function Home() {
  const { i18n } = useTranslation("menu");
  return (
    <div className="pt-6">
      <Button>{i18n.language}</Button>
      <Button
        onPress={() => {
          i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
        }}
      >
        change
      </Button>
    </div>
  );
}

export default Home;
