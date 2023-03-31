import React, { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavigationRoutes } from "@/data/enums";
import {
  MapIcon,
  HomeIcon,
  PlusCircleIcon,
  PhotoIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

type BottomNavLinkPropsType = {
  route: string;
  children: ReactElement;
};

const BottomNavLink = ({ route, children }: BottomNavLinkPropsType) => {
  const { pathname } = useRouter();
  return (
    <Link href={route} className={pathname === route ? "active" : ""}>
      <span className="h-5 w-5">{children}</span>
    </Link>
  );
};

export function BottomNav(): ReactElement {
  return (
    <div className="btm-nav">
      <BottomNavLink route={NavigationRoutes.Home}>
        <HomeIcon />
      </BottomNavLink>
      <BottomNavLink route={NavigationRoutes.Map}>
        <MapIcon />
      </BottomNavLink>
      <BottomNavLink route={NavigationRoutes.Add}>
        <PlusCircleIcon />
      </BottomNavLink>
      <BottomNavLink route={NavigationRoutes.Posts}>
        <PhotoIcon />
      </BottomNavLink>
      <BottomNavLink route={NavigationRoutes.Account}>
        <UserIcon />
      </BottomNavLink>
    </div>
  );
}
