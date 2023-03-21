import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material/className";

ClassNameGenerator.configure(componentName => {
    const characterArray = componentName.replace("Mui", "").split("");
    return characterArray.map(char => (/[aeiouyAEIOUY]/.test(char) ? "" : char)).join("");
});
