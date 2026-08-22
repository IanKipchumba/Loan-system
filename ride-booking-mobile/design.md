# Ride Booking Mobile — Interface Design Plan

## Product Direction

Ride Booking is a focused passenger prototype for requesting a car without account setup, payment integration, live location services, or driver-side tooling. The experience is designed for portrait orientation and one-handed use, following mainstream iOS conventions: clear hierarchy, large touch targets, safe-area spacing, familiar bottom-sheet patterns, and restrained motion.

## Screen List

| Screen | Primary content and functionality |
|---|---|
| Home / Plan a ride | Greeting, compact map-like route canvas, pickup and destination fields, current-location affordance, recent place shortcut, and a primary “See ride options” action. |
| Ride options | Route summary, selectable ride cards for Standard, Comfort, and XL, estimated arrival time, upfront fare estimate, and a sticky “Confirm ride” action. |
| Booking confirmed / Trip status | Confirmation state, driver card with avatar and vehicle details, pickup ETA, trip progress indicator, safety/share actions, and “Cancel ride” action returning to the home state. |
| Activity | Recent completed or cancelled rides using a simple FlatList; selecting a ride shows its route and fare summary. |
| Account | Lightweight profile placeholder with saved payment label, help, and app settings. No sign-in flow is required for this prototype. |

## Key User Flows

### Request a ride

1. The user opens Home and sees the pickup set to “Current location”.
2. The user taps the destination field and chooses or types a destination.
3. The user taps “See ride options”.
4. The Ride options screen presents Standard as the default selection and shows the fare estimate.
5. The user chooses another ride type if desired.
6. The user taps “Confirm ride”.
7. The Trip status screen confirms the booking and shows a simulated driver arriving shortly.

### Cancel a ride

1. The user taps “Cancel ride” from Trip status.
2. A compact confirmation dialog explains that the prototype will cancel the request.
3. The user confirms cancellation.
4. The app returns to Home with a brief cancellation notice.

### Review activity

1. The user taps Activity in the tab bar.
2. The app displays recent rides with route names, date, ride type, and fare.
3. The user can tap a row to inspect the selected ride summary.

## Layout and Interaction Rules

The primary action remains reachable in the lower portion of the screen, above the tab bar and home indicator. Inputs are stacked vertically with clear labels and a route connector line. Cards use 16–20pt corner radii, subtle borders, and enough spacing for thumb interaction. Primary buttons use a pressed scale/opacity response and light haptics on native platforms. The prototype uses a stylized map canvas rather than a live map SDK so it remains self-contained and does not require map credentials.

## Brand Colors

| Token | Color | Purpose |
|---|---|---|
| Ink | `#111111` | Primary text, navigation, and high-contrast controls. |
| Paper | `#F7F7F5` | Warm app background and map canvas. |
| White | `#FFFFFF` | Elevated cards and input surfaces. |
| Signal green | `#B8F36B` | Primary booking action and selected states. |
| Moss | `#5E7A3B` | Secondary accents, route lines, and success messaging. |
| Slate | `#6F746B` | Supporting text and metadata. |
| Line | `#E3E5DF` | Borders and separators. |
| Alert | `#C95C45` | Cancellation and destructive actions. |

## Prototype Data Model

A ride request contains `pickup`, `destination`, `rideType`, `fare`, `eta`, and `status`. The app keeps this state locally with React state; backend sync and real-time driver updates are intentionally out of scope for the first version.
