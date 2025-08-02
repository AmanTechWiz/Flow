export const PROJECT_TEMPLATES = [
  {
    emoji: "🎬",
    title: "Streaming Platform Homepage",
    prompt:
      "First, install `next-themes` by running `npm install next-themes --yes`. Then, create a theme provider in `app/theme-provider.tsx` and wrap the root layout with it. Create a theme toggle button using a Shadcn `Button` and `DropdownMenu` to switch between 'light', 'dark', and 'system' themes, and place it in the header. Build a streaming homepage with a full-width hero section. Add horizontally scrollable rows for 'Trending Now', 'Top Picks', and 'New Releases' using Shadcn `Card` components for the media items. Use `lucide-react` icons within the cards. Clicking a card must open a Shadcn `Dialog` component to show mock data for the title, genre, and a brief description. All data must be local mock data. All styling must use Tailwind CSS utility classes.",
  },
  {
    emoji: "📦",
    title: "Modern Admin Interface",
    prompt:
      "First, install `recharts` and `next-themes` by running `npm install recharts next-themes --yes`. Then, create a theme provider and a theme toggle button. Build a responsive admin dashboard with a collapsible sidebar using Shadcn `Sheet` for the mobile view. The main view should have a top bar, a grid of analytic stat cards (e.g., revenue, user count) built with Shadcn `Card`, an interactive line chart using `recharts` with mock data, and a paginated data table using Shadcn `Table` with sorting controls. All data must be local mock data. All styling must use Tailwind CSS utility classes.",
  },
  {
    emoji: "📋",
    title: "Drag-and-Drop Task Manager",
    prompt:
      "First, install `react-beautiful-dnd` and `next-themes` by running `npm install react-beautiful-dnd next-themes @types/react-beautiful-dnd --yes`. Then, set up a theme provider and toggle. Create a Kanban board with 'To Do', 'In Progress', and 'Done' columns. Use `react-beautiful-dnd` to allow users to drag and drop tasks between columns. Tasks should be represented by Shadcn `Card` components. Implement a Shadcn `Dialog` to add new tasks to the 'To Do' column. Ensure all state is managed locally. Make sure the tasks are draggable and can drop it to one section to another. All styling must use Tailwind CSS utility classes.",
  },
  {
    emoji: "🗂️",
    title: "Interactive File Explorer",
    prompt:
      "First, install `next-themes` by running `npm install next-themes --yes`. Then, set up a theme provider and toggle. Build a file explorer UI. It must have a breadcrumb navigation bar at the top, built with Shadcn `Breadcrumb`. The main content area should display a grid of files and folders using Shadcn `Card`. Include `lucide-react` icons to differentiate between file and folder types. Implement a toggle using Shadcn `Switch` to change between a grid and list view. All file system data must be mocked and managed in local state. All styling must use Tailwind CSS utility classes.",
  },
  {
    emoji: "📺",
    title: "Video Content Hub",
    prompt:
      "First, install `next-themes` by running `npm install next-themes --yes`. Then, set up a theme provider and toggle. Design a media content hub with a sidebar for category filters using Shadcn `RadioGroup`. The main area should feature a responsive grid of video thumbnails using Shadcn `Card`. Clicking a card should open a Shadcn `Dialog` to show mock video details like title, uploader, and view count. Use `lucide-react` icons for UI elements. All data must be local mock data. All styling must use Tailwind CSS utility classes.",
  },
  {
    emoji: "🛍️",
    title: "E-commerce Product Showcase",
    prompt:
      "First, install `next-themes` by running `npm install next-themes --yes`. Then, set up a theme provider and toggle. Create an e-commerce page with a sidebar for filters (category, price) using Shadcn `Checkbox` and `Slider`. The main content must be a responsive grid of product cards built with Shadcn `Card`. Each card should have an image placeholder, product name, price, and an 'Add to Cart' `Button`. Clicking the button should provide feedback using a Shadcn `Toast`. All data must be local mock data. All styling must use Tailwind CSS utility classes.",
  },
  {
    emoji: "🏡",
    title: "Property Listings Explorer",
    prompt:
      "First, install `next-themes` by running `npm install next-themes --yes`. Then, set up a theme provider and toggle. Build a property listing page. Use Shadcn `Card` components to display each property in a responsive grid. Include a sidebar with filters for price range and amenities using Shadcn `Slider` and `Checkbox`. Clicking a card should open a Shadcn `Drawer` to show detailed information and a placeholder for an image gallery. Use `lucide-react` icons to highlight features like WiFi or parking. All data must be local mock data. All styling must use Tailwind CSS utility classes.",
  },
  {
    emoji: "🎵",
    title: "Music Player UI",
    prompt:
      "First, install `next-themes` by running `npm install next-themes --yes`. Then, set up a theme provider and toggle. Design a music player UI with a three-column layout. The left column should list playlists using Shadcn `List`. The center column should show the current playlist's tracks. The bottom of the page must have a fixed playback control bar with play/pause buttons, a seek bar using Shadcn `Slider`, and volume control. Use `lucide-react` for all icons. All track and playlist data must be local mock data and managed with local state. All styling must use Tailwind CSS utility classes.",
  },
] as const;