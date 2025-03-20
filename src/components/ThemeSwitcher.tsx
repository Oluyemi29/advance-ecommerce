"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-3">
      <Dropdown className="min-w-max">
        <DropdownTrigger>
          <Button className="text-foreground bg-background" variant="bordered">{theme}</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem className="text-foreground bg-background" onPress={() => setTheme("light")} key="light">
            Light
          </DropdownItem>
          <DropdownItem className="text-foreground bg-background" onPress={() => setTheme("dark")} key="dark">
            Dark
          </DropdownItem>
          <DropdownItem className="text-foreground bg-background" onPress={() => setTheme("system")} key="system">
            System
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ThemeSwitcher;
