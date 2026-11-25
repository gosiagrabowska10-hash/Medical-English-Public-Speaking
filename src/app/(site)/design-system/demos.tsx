"use client";

import { useState } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Dropdown, DropdownContent, DropdownItem, DropdownLabel, DropdownSeparator, DropdownTrigger } from "@/components/ui/dropdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecorderControls, type RecorderState } from "@/components/app/recorder-controls";

export function OverlayDemos() {
  return (
    <div className="flex flex-wrap gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open modal</Button>
        </DialogTrigger>
        <DialogContent title="Recording consent" description="Before your first recording, we need your permission.">
          <p className="text-sm leading-relaxed text-ink-muted">Your recording will be stored securely and analysed to provide feedback. You can delete it at any time. Please do not mention identifiable patient information.</p>
          <div className="mt-8 flex justify-end gap-3">
            <DialogClose asChild><Button variant="ghost">Not now</Button></DialogClose>
            <DialogClose asChild><Button>I consent</Button></DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="outline">Account <ChevronDown /></Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Signed in</DropdownLabel>
          <DropdownItem><User /> Profile</DropdownItem>
          <DropdownItem><Settings /> Account settings</DropdownItem>
          <DropdownSeparator />
          <DropdownItem><LogOut /> Sign out</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

export function TabsDemo() {
  return (
    <Tabs defaultValue="transcript">
      <TabsList>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
      </TabsList>
      <TabsContent value="transcript"><p className="text-ink-muted">The transcript of a recording appears here, with filler words highlighted.</p></TabsContent>
      <TabsContent value="analysis"><p className="text-ink-muted">Measured delivery metrics appear here.</p></TabsContent>
      <TabsContent value="feedback"><p className="text-ink-muted">Language and structure feedback appear here.</p></TabsContent>
    </Tabs>
  );
}

export function RecorderDemo() {
  const [state, setState] = useState<RecorderState>("idle");
  const levels = state === "idle" ? [] : Array.from({ length: 48 }, (_, i) => 15 + ((i * 37) % 60));
  return (
    <RecorderControls
      state={state}
      seconds={state === "idle" ? 0 : 74}
      levels={levels}
      onStart={() => setState("recording")}
      onPause={() => setState((s) => (s === "paused" ? "recording" : "paused"))}
      onStop={() => setState("recorded")}
      onRetake={() => setState("idle")}
    />
  );
}
