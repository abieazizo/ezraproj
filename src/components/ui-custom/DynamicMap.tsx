import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-brand-cream rounded-xl animate-pulse" />
  ),
});

export default DynamicMap;
