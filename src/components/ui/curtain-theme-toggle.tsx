"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";
import { Moon, Sun, Search, User } from "lucide-react";
import { useTheme } from "next-themes";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = "light" | "dark";

export interface AppBarProps {
  /** Logo to display in the AppBar */
  logo?: ReactNode;
  /** Application name */
  appName?: string;
  /** If provided, renders a search input */
  onSearch?: (query: string) => void;
  /** User avatar image URL or element */
  userAvatar?: ReactNode;
  /** User name to display */
  userName?: string;
}

export interface ThemeToggleProps {
  /** Variant of the top bar. Default: "default" */
  variant?: "default" | "appbar" | "icon";
  /** Content for the app bar when variant is "appbar" */
  appBarProps?: AppBarProps;
  /** Starting theme. Default: "light" */
  defaultTheme?: Theme;
  /** Height of the top bar in px. Default: 44 for default, 60 for appbar */
  barHeight?: number;
  /** Diameter of the icon button in px. Default: 36 */
  buttonSize?: number;
  /** Curtain animation duration in ms. Default: 550 */
  duration?: number;
  /** Called after each theme change completes */
  onThemeChange?: (theme: Theme) => void;
  /** Page content rendered below the bar */
  children?: ReactNode;
}

// ─── Design tokens ────────────────────────────────────────────────────────────

const TOKENS: Record<Theme, Record<string, string>> = {
  light: {
    pageBg:    "#FAFAFA",
    pageText:  "#0A0A0A",
    barBg:     "#0A0A0A",
    barText:   "#FAFAFA",
    barBorder: "rgba(255,255,255,0.07)",
    btnBg:     "#FAFAFA",
    btnText:   "#0A0A0A",
    btnRing:   "rgba(255,255,255,0.15)",
    inputBg:   "rgba(255,255,255,0.1)",
    inputText: "#FAFAFA",
  },
  dark: {
    pageBg:    "#0A0A0A",
    pageText:  "#FAFAFA",
    barBg:     "#FAFAFA",
    barText:   "#0A0A0A",
    barBorder: "rgba(0,0,0,0.10)",
    btnBg:     "#0A0A0A",
    btnText:   "#FAFAFA",
    btnRing:   "rgba(0,0,0,0.25)",
    inputBg:   "rgba(0,0,0,0.08)",
    inputText: "#0A0A0A",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

type CurtainPhase = "idle" | "falling" | "rising";

const EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

export function ThemeToggle({
  variant      = "default",
  appBarProps,
  defaultTheme = "light",
  barHeight: explicitBarHeight,
  buttonSize   = 36,
  duration     = 550,
  onThemeChange,
  children,
}: ThemeToggleProps) {
  const isAppBar = variant === "appbar";
  const isIcon = variant === "icon";
  const barHeight = explicitBarHeight ?? (isAppBar ? 60 : 44);

  const { theme: nextTheme, setTheme: setNextTheme, resolvedTheme } = useTheme();
  const [theme, setTheme]     = useState<Theme>((resolvedTheme as Theme) || "light");
  const [phase, setPhase]     = useState<CurtainPhase>("idle");
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const curtainColorRef       = useRef<string>("");
  const t                     = TOKENS[theme];

  // Sync with next-themes
  useEffect(() => {
    setMounted(true);
    if (resolvedTheme) {
      setTheme(resolvedTheme as Theme);
    }
  }, [resolvedTheme]);

  const toggle = useCallback(() => {
    if (phase !== "idle") return;
    const next: Theme = theme === "light" ? "dark" : "light";
    curtainColorRef.current = TOKENS[next].pageBg;
    setPhase("falling");

    setTimeout(() => {
      setTheme(next);
      setNextTheme(next);
      onThemeChange?.(next);
      
      setPhase("rising");
      setTimeout(() => setPhase("idle"), duration + 60);
    }, duration);
  }, [phase, theme, duration, onThemeChange, setNextTheme]);

  if (!mounted) return null;

  // ── Derived styles ──────────────────────────────────────────────────────────

  const pageStyle: CSSProperties = {
    minHeight: "100vh",
    paddingTop: barHeight,
    background: t.pageBg,
    color: t.pageText,
    transition: "background 0.3s ease, color 0.3s ease",
  };

  const barStyle: CSSProperties = {
    position: "fixed",
    top: 0, left: 0, right: 0,
    height: barHeight,
    background: t.barBg,
    color: t.barText,
    borderBottom: `1px solid ${t.barBorder}`,
    overflow: "visible",
    zIndex: 9998,
    transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
    display: isAppBar ? "flex" : "block",
    alignItems: "center",
    justifyContent: "space-between",
    padding: isAppBar ? "0 24px" : "0",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const btnScale = pressed ? 0.96 : hovered ? 1.1 : 1;
  const btnStyle: CSSProperties = {
    position: isAppBar || isIcon ? "relative" : "absolute",
    bottom: isAppBar || isIcon ? "auto" : -(buttonSize / 2),
    left: isAppBar || isIcon ? "auto" : "50%",
    transform: isAppBar || isIcon ? `scale(${btnScale})` : `translateX(-50%) scale(${btnScale})`,
    width: buttonSize,
    height: buttonSize,
    borderRadius: "0px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: t.btnBg,
    color: t.btnText,
    boxShadow: `0 0 0 1.5px ${t.btnRing}`,
    zIndex: 9999,
    outline: "none",
    transition:
      "background 0.3s ease, color 0.3s ease, transform 0.15s ease, box-shadow 0.3s ease",
    marginLeft: isAppBar ? "16px" : "0",
    flexShrink: 0,
  };

  const curtainStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    background: curtainColorRef.current,
    transformOrigin: "top",
    transform: phase === "falling" ? "scaleY(1)" : "scaleY(0)",
    transition:
      phase !== "idle" ? `transform ${duration}ms ${EASING}` : "none",
    zIndex: 9997,
    pointerEvents: "none",
  };

  const appBarSectionStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  if (isIcon) {
    return (
      <>
        <div aria-hidden="true" style={curtainStyle} />
        <button
          style={btnStyle}
          onClick={toggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setPressed(false); }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          aria-pressed={theme === "dark"}
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Curtain overlay */}
      <div aria-hidden="true" style={curtainStyle} />

      {/* Fixed top bar */}
      <div style={barStyle}>
        
        {isAppBar && (
          <div style={{ ...appBarSectionStyle, flex: 1 }}>
            {appBarProps?.logo && (
              <div style={{ display: "flex", alignItems: "center" }}>
                {appBarProps.logo}
              </div>
            )}
            {appBarProps?.appName && (
              <span style={{ fontWeight: 600, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
                {appBarProps.appName}
              </span>
            )}
          </div>
        )}

        {isAppBar && appBarProps?.onSearch && (
          <div style={{ ...appBarSectionStyle, flex: 1, justifyContent: "center" }}>
            <div style={{ 
              position: "relative", 
              width: "100%", 
              maxWidth: "320px",
              display: "flex",
              alignItems: "center"
            }}>
              <div style={{ position: "absolute", left: "12px", display: "flex", opacity: 0.6 }}>
                <Search className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                placeholder="Search..."
                onChange={(e) => appBarProps.onSearch?.(e.target.value)}
                style={{
                  width: "100%",
                  height: "36px",
                  padding: "0 16px 0 36px",
                  borderRadius: "0px",
                  border: "none",
                  outline: "none",
                  background: t.inputBg,
                  color: t.inputText,
                  fontSize: "0.9rem",
                  transition: "background 0.3s ease, color 0.3s ease",
                }}
              />
            </div>
          </div>
        )}

        {isAppBar && (
          <div style={{ ...appBarSectionStyle, flex: 1, justifyContent: "flex-end" }}>
            {appBarProps?.userName && (
              <span style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                {appBarProps.userName}
              </span>
            )}
            {appBarProps?.userAvatar !== undefined ? (
              appBarProps.userAvatar
            ) : (
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "0px",
                background: t.inputBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: t.inputText,
              }}>
                <User className="w-4 h-4" />
              </div>
            )}
            
            {/* Toggle Button in AppBar */}
            <button
              style={btnStyle}
              onClick={toggle}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => { setHovered(false); setPressed(false); }}
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              aria-pressed={theme === "dark"}
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        )}

        {!isAppBar && (
          // Default layout: just the button hanging out
          <button
            style={btnStyle}
            onClick={toggle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setPressed(false); }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            aria-pressed={theme === "dark"}
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        )}

      </div>

      {/* Page content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
