import { Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./screens/Home/Index";
import i18n from "./i18n";
import LocaleContext from "./LocaleContext";

function Loading() {
  return <>Loading....</>;
}
function App() {
  const [locale, setLocale] = useState(i18n.language);
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));
  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <Suspense fallback={<Loading />}>
          <Router>
            <Navbar locale={locale} handleChange={handleChange} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Home />} />
            </Routes>
          </Router>
        </Suspense>
      </LocaleContext.Provider>
    </>
  );
}

export default App;
