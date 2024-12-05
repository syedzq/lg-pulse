'use client';

import { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { Cog8ToothIcon, EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

interface GlobeSettings {
  donationsPerMinute: number;
  showDonationFeed: boolean;
  showHearts: boolean;
  showCurrency: boolean;
  texture: 'watercolor' | 'earth_atmos_2048' | 'earth-day';
  backgroundColor: string;
}

interface GlobeControlsProps {
  settings: GlobeSettings;
  onSettingsChange: (settings: GlobeSettings) => void;
}

const TEXTURE_OPTIONS = [
  { 
    value: 'watercolor', 
    label: 'Watercolor',
    thumbnail: '/watercolor.jpg'
  },
  { 
    value: 'earth_atmos_2048', 
    label: 'Earth Atmosphere',
    thumbnail: '/earth_atmos_2048.jpg'
  },
  { 
    value: 'earth-day', 
    label: 'Earth Day',
    thumbnail: '/earth-day.jpg'
  },
] as const;

const BACKGROUND_COLORS = [
  '#177899', // Current light blue
  '#000000', // True black
  '#0A1128', // Space-like blue-black
  '#1B1145', // Space-like purple-blue-black
] as const;

export function GlobeControls({ settings, onSettingsChange }: GlobeControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [customColor, setCustomColor] = useState(settings.backgroundColor);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateSettings = (key: keyof GlobeSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    onSettingsChange(newSettings);
    
    const params = new URLSearchParams(window.location.search);
    params.set(key, value.toString());
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleCustomColorChange = (color: string) => {
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      setCustomColor(color);
      updateSettings('backgroundColor', color);
    }
  };

  const copySettingsLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const SettingsContent = () => (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white">
            Donations per minute
          </label>
          <span className="text-sm text-white">
            {settings.donationsPerMinute}
          </span>
        </div>
        <div className="relative">
          <div 
            className="relative"
            onPointerDown={(e) => {
              // Prevent drawer drag when clicking/touching the slider
              e.stopPropagation();
            }}
          >
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={settings.donationsPerMinute}
              onChange={(e) => {
                e.stopPropagation();
                updateSettings('donationsPerMinute', parseInt(e.target.value));
              }}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>
          <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-[10px] text-white/40 px-1">
            <span>0</span>
            <span>15</span>
            <span>30</span>
            <span>45</span>
            <span>60</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white">
            Show donation feed
          </label>
          <button
            onClick={() => updateSettings('showDonationFeed', !settings.showDonationFeed)}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.showDonationFeed ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.showDonationFeed ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white">
            Animated hearts
          </label>
          <button
            onClick={() => {
              const newValue = !settings.showHearts;
              updateSettings('showHearts', newValue);
              
              // Explicitly update URL parameter
              const params = new URLSearchParams(window.location.search);
              params.set('showHearts', newValue.toString());
              window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
            }}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.showHearts ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.showHearts ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white">
            Animated donation amount
          </label>
          <button
            onClick={() => updateSettings('showCurrency', !settings.showCurrency)}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.showCurrency ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.showCurrency ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">
          Globe Texture
        </label>
        <div className="grid grid-cols-3 gap-2">
          {TEXTURE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => updateSettings('texture', option.value)}
              className={`relative group rounded-lg overflow-hidden transition-all ${
                settings.texture === option.value 
                  ? 'ring-2 ring-white scale-95' 
                  : 'hover:scale-95'
              }`}
            >
              <div className="relative aspect-square">
                {/* Thumbnail */}
                <img
                  src={option.thumbnail}
                  alt={option.label}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 transition-opacity ${
                  settings.texture === option.value
                    ? 'bg-white/20'
                    : 'bg-black/40 group-hover:bg-black/20'
                }`} />
                
                {/* Selected indicator */}
                {settings.texture === option.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white p-1">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-green-500" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-1 text-xs text-white text-center bg-black/50">
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">
          Background Color
        </label>
        <div className="flex items-center gap-2">
          {BACKGROUND_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => updateSettings('backgroundColor', color)}
              className={`w-10 h-10 rounded-full transition-transform ${
                settings.backgroundColor === color ? 'ring-2 ring-white scale-90' : 'ring-1 ring-white/25 hover:scale-90'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Set background color to ${color}`}
            />
          ))}
          <label className="relative group cursor-pointer">
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleCustomColorChange(e.target.value)}
              className="sr-only" // Hide visually but keep accessible
            />
            <div 
              className={`w-10 h-10 rounded-full transition-transform ${
                !BACKGROUND_COLORS.includes(settings.backgroundColor as any) ? 'ring-2 ring-white scale-90' : 'hover:scale-90'
              }`}
              style={{ backgroundColor: customColor }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-75 transition-opacity">
                <EllipsisHorizontalIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setIsOpen(true)}
        aria-label="Open globe settings"
        className="fixed left-1/2 -translate-x-1/2 bottom-4 border border-white/15 bg-white/10 dark:bg-white/10 text-white dark:text-white hover:bg-white/20 dark:hover:bg-white/20 backdrop-blur-lg"
      >
        <Cog8ToothIcon className="mr-2 w-6 h-6 text-white" />
        Customize
      </Button>

      <Drawer.Root open={isOpen} onOpenChange={setIsOpen} direction={isMobile ? 'bottom' : 'left'}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Title className="sr-only">Globe Settings</Drawer.Title>
          <Drawer.Content 
            className={`bg-white/10 backdrop-blur-xl flex flex-col fixed ${
              isMobile 
                ? 'rounded-t-[10px] h-[96vh] mt-24 bottom-0 left-0 right-0' 
                : 'h-full w-[400px] left-0 top-0'
            }`}
          >
            <div className={`flex flex-col h-full ${isMobile ? 'rounded-t-[10px]' : ''}`}>
              {/* Header */}
              <div className="p-4">
                {isMobile ? (
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-white/50 mb-8" />
                ) : (
                  <div className="flex justify-between items-center mb-8">
                    <div className="text-xl font-semibold text-white">Globe Settings</div>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full hover:bg-white/10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                {isMobile && <div className="text-xl font-semibold text-white mb-4">Globe Settings</div>}
              </div>

              {/* Settings Content (scrollable) */}
              <div className="flex-1 overflow-y-auto">
                <SettingsContent />
              </div>

              {/* Copy Link Button (fixed at bottom) */}
              <div className="p-4 border-t border-white/10">
                <Button
                  onClick={copySettingsLink}
                  className="w-full py-3 px-4 bg-white/10 dark:bg-white/10 border-none hover:bg-white/20 dark:hover:bg-white/20 transition-colors text-white dark:text-white font-medium flex items-center justify-center gap-2"
                >
                  {hasCopied ? (
                    <>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
                        />
                      </svg>
                      Copy Settings Link
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}