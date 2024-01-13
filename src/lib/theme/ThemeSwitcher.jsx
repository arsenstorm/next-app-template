"use client";

// TODO: Theme Switcher needs to be reimplemented

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    switchTheme,
    getTheme,
} from '@/lib/theme/themeManager'
import { useEffect, useState } from "react";
import {
    AppCustomisation
} from "@/lib/app/customisation";

export default function ThemeSwitcher({
    themes = AppCustomisation.branding.themes
}) {
    const [currentTheme, setCurrentTheme] = useState(null);

    useEffect(() => {
        setCurrentTheme(getTheme());
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Change Theme
                </CardTitle>
                <CardDescription>
                    Change the look and feel of the app.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-1.5 w-full max-w-xs">
                    {themes.map((theme) => (
                        <Button
                            key={theme}
                            onClick={() => {
                                switchTheme(theme);
                                setCurrentTheme(theme);
                            }}
                            //disabled={currentTheme === theme}
                            disabled
                        >
                            {theme.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")} Theme
                        </Button>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                        switchTheme(null);
                        setCurrentTheme(null);
                    }}
                    //disabled={currentTheme === null}
                    disabled
                >
                    Reset Theme
                </Button>
            </CardFooter>
        </Card>
    )
}