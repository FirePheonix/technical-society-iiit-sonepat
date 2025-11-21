import React from "react";

import HeroCanvas from "@/sections/webdev/HeroCanvas";
import LandingContent from "@/sections/webdev/LandingContent";

const App: React.FC = () => {
    return (
        <div>
            <HeroCanvas />
            <LandingContent />
        </div>
    );
};

export default App;