"use client";

import { useContext } from "react";
import UserContext from "@/context/UserContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Lightbulb, Monitor, Briefcase } from "lucide-react";

import type { ElementType } from "react";

interface Tile {
  title: string;
  description: string;
  icon: ElementType;
  roles?: string[];
}

const tiles: Tile[] = [
  {
    title: "Latest Insight",
    description: "Trend analysis for marketing teams",
    icon: Lightbulb,
    roles: ["Marketer"],
  },
  {
    title: "Tech Demo",
    description: "Showcase of our newest tools",
    icon: Monitor,
    roles: ["Technologist"],
  },
  {
    title: "Executive Stats",
    description: "Key numbers for decision makers",
    icon: Briefcase,
    roles: ["Executive"],
  },
];

export default function BentoGrid() {
  const { role } = useContext(UserContext);
  const filtered = role
    ? tiles.filter((t) => !t.roles || t.roles.includes(role))
    : tiles;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 py-8">
      {filtered.map((tile) => (
        <Card key={tile.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center space-x-2">
            <tile.icon className="h-5 w-5 text-sitecore-purple" />
            <CardTitle>{tile.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{tile.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
