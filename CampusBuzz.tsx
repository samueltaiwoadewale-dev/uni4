import React, { useState, useEffect } from "react";
import { 
  Megaphone, 
  MessageSquare, 
  ShoppingBag, 
  Cpu, 
  Heart, 
  ThumbsUp, 
  ThumbsDown, 
  Plus, 
  MapPin, 
  Tag, 
  Sparkles,
  PenSquare,
  Share2,
  Flame,
  Award,
  Video,
  Image as ImageIcon,
  Radio,
  Bell,
  CheckCircle,
  Hash,
  Smile,
  Send,
  Volume2,
  X,
  TrendingUp,
  ChevronRight,
  UserCheck,
  MoreVertical,
  Bookmark,
  Check
} from "lucide-react";
import { University } from "../types";
import { UniVerseLogo } from "./Logo";

// Extended interactive post interface for high-fidelity social features
interface InteractivePost {
  id: string;
  universityId: string;
  authorName: string;
  authorHandle: string;
  authorRole: "Student" | "Rep" | "Lecturer" | "Alumni" | "Admin";
  authorClass?: string;
  authorDepartment?: string;
  avatarBg: string;
  timestamp: string;
  category: "announcements" | "buzz" | "marketplace" | "gigs";
  title?: string;
  content: string;
  likes: number;
  commentsCount: number;
  hasLiked?: boolean;
  price?: string;
  locationDetail?: string;
  department?: string;
  mediaType?: "image" | "video";
  mediaUrl?: string;
  comments: Array<{
    id: string;
    author: string;
    handle: string;
    avatarBg: string;
    text: string;
    timestamp: string;
    likes: number;
    hasLiked?: boolean;
  }>;
  repostedFrom?: {
    authorName: string;
    authorHandle: string;
    content: string;
  };
  hashtags: string[];
}

// Interactive Story / TikTok style moment interface
interface CampusStory {
  id: string;
  authorName: string;
  authorHandle: string;
  avatarBg: string;
  uni: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  caption: string;
  views: string;
  likes: string;
  shares: string;
  tags?: string[];
  department?: string;
  timestamp?: string;
}

const frequentContacts = [
  { name: "Samuel Taiwo", handle: "sam_unilag", avatarBg: "bg-blue-500", uni: "UNILAG" },
  { name: "Joy Okon", handle: "joy_uniuyo", avatarBg: "bg-pink-500", uni: "UNIUYO" },
  { name: "Emeka Obi", handle: "emeka_unn", avatarBg: "bg-green-500", uni: "UNN" },
  { name: "Fatima Bala", handle: "fatima_abu", avatarBg: "bg-purple-500", uni: "ABU" },
  { name: "Tunde Ednut", handle: "tunde_lasu", avatarBg: "bg-amber-500", uni: "LASU" },
];

const universities: University[] = [
  { id: "all", name: "All African Universities Network", abbreviation: "NET", location: "Regional Content", established: "-", popularSlang: "Everywhere", scale: 5.0 },
  { id: "unilag", name: "University of Lagos", abbreviation: "UNILAG", location: "Akoka, Lagos", established: "1962", popularSlang: "Akokites, Moremi, LT 1, Jaja Loop", scale: 5.0 },
  { id: "ui", name: "University of Ibadan", abbreviation: "UI", location: "Ibadan, Oyo", established: "1948", popularSlang: "First & Best, Tedder Hall, Mellanby", scale: 7.0 },
  { id: "oau", name: "Obafemi Awolowo University", abbreviation: "OAU", location: "Ile-Ife, Osun", established: "1961", popularSlang: "Great Ife, Angola, Oduduwa Hall, SUB Gym", scale: 5.0 },
  { id: "abu", name: "Ahmadu Bello University", abbreviation: "ABU", location: "Zaria, Kaduna", established: "1962", popularSlang: "Naturally Ahead, Congo site", scale: 5.0 },
  { id: "unn", name: "University of Nigeria, Nsukka", abbreviation: "UNN", location: "Nsukka, Enugu", established: "1955", popularSlang: "Lions & Lionesses, Franco, Hilltop", scale: 5.0 },
  { id: "unilorin", name: "University of Ilorin", abbreviation: "UNILORIN", location: "Ilorin, Kwara", established: "1975", popularSlang: "Better by far, PS, Walk-way", scale: 5.0 },
  { id: "lasu", name: "Lagos State University", abbreviation: "LASU", location: "Ojo, Lagos", established: "1983", popularSlang: "We are LASU, proud, Aluta", scale: 5.0 },
  { id: "funaab", name: "Federal University of Agriculture, Abeokuta", abbreviation: "FUNAAB", location: "Abeokuta, Ogun", established: "1988", popularSlang: "Funaabites, Motion ground", scale: 5.0 },
  { id: "uniport", name: "University of Port Harcourt", abbreviation: "UNIPORT", location: "Port Harcourt, Rivers", established: "1975", popularSlang: "Unique Uniport", scale: 5.0 },
  { id: "uniben", name: "University of Benin", abbreviation: "UNIBEN", location: "Benin City, Edo", established: "1970", popularSlang: "Greatest Uniben, Kwaso", scale: 5.0 },
  { id: "buk", name: "Bayero University, Kano", abbreviation: "BUK", location: "Kano, Kano", established: "1975", popularSlang: "Bayero", scale: 5.0 },
  { id: "futa", name: "Federal University of Technology, Akure", abbreviation: "FUTA", location: "Akure, Ondo", established: "1981", popularSlang: "Great Futa, Great Futurists", scale: 5.0 },
  { id: "futo", name: "Federal University of Technology, Owerri", abbreviation: "FUTO", location: "Owerri, Imo", established: "1980", popularSlang: "Great Futo", scale: 5.0 },
  { id: "futminna", name: "Federal University of Technology, Minna", abbreviation: "FUTMINNA", location: "Minna, Niger", established: "1982", popularSlang: "Great Futminna", scale: 5.0 },
  { id: "unizik", name: "Nnamdi Azikiwe University", abbreviation: "UNIZIK", location: "Awka, Anambra", established: "1991", popularSlang: "Zikites", scale: 5.0 },
  { id: "unijos", name: "University of Jos", abbreviation: "UNIJOS", location: "Jos, Plateau", established: "1975", popularSlang: "Josite", scale: 5.0 },
  { id: "unical", name: "University of Calabar", abbreviation: "UNICAL", location: "Calabar, Cross River", established: "1975", popularSlang: "Malabites & Malabresses", scale: 5.0 },
  { id: "uniuyo", name: "University of Uyo", abbreviation: "UNIUYO", location: "Uyo, Akwa Ibom", established: "1991", popularSlang: "Uyoites", scale: 5.0 },
  { id: "lautech", name: "Ladoke Akintola University of Technology", abbreviation: "LAUTECH", location: "Ogbomoso, Oyo", established: "1990", popularSlang: "Lautechites", scale: 5.0 },
  { id: "kwasu", name: "Kwara State University", abbreviation: "KWASU", location: "Malete, Kwara", established: "2009", popularSlang: "Kwasuites", scale: 5.0 },
  { id: "tasued", name: "Tai Solarin University of Education", abbreviation: "TASUED", location: "Ijebu-Ode, Ogun", established: "2005", popularSlang: "Tasuedites", scale: 5.0 },
  { id: "eksu", name: "Ekiti State University", abbreviation: "EKSU", location: "Ado-Ekiti, Ekiti", established: "1982", popularSlang: "Eksuites", scale: 5.0 },
  { id: "oou", name: "Olabisi Onabanjo University", abbreviation: "OOU", location: "Ago-Iwoye, Ogun", established: "1982", popularSlang: "Oouites", scale: 5.0 },
  { id: "delsu", name: "Delta State University", abbreviation: "DELSU", location: "Abraka, Delta", established: "1992", popularSlang: "Delsuites", scale: 5.0 },
  { id: "nsuk", name: "Nasarawa State University", abbreviation: "NSUK", location: "Keffi, Nasarawa", established: "2001", popularSlang: "Nsukites", scale: 5.0 },
  { id: "bsu", name: "Benue State University", abbreviation: "BSU", location: "Makurdi, Benue", established: "1992", popularSlang: "Bsuites", scale: 5.0 },
  { id: "absu", name: "Abia State University", abbreviation: "ABSU", location: "Uturu, Abia", established: "1981", popularSlang: "Absuites", scale: 5.0 },
  { id: "mouau", name: "Michael Okpara University of Agriculture", abbreviation: "MOUAU", location: "Umudike, Abia", established: "1992", popularSlang: "Umudikeites", scale: 5.0 },
  { id: "atbu", name: "Abubakar Tafawa Balewa University", abbreviation: "ATBU", location: "Bauchi, Bauchi", established: "1980", popularSlang: "Great Atbu", scale: 5.0 },
  { id: "nda", name: "Nigerian Defence Academy", abbreviation: "NDA", location: "Kaduna, Kaduna", established: "1964", popularSlang: "Kaduna cadets", scale: 5.0 }
];

interface PublicProfile {
  name: string;
  handle: string;
  role?: string;
  avatarBg?: string;
  avatarUrl?: string;
  location?: string;
  university?: string;
  likes?: number;
  commentsCount?: number;
}

export default function CampusBuzz({ 
  isPremium, 
  userProfile, 
  onSwitchTab 
}: { 
  isPremium: boolean, 
  userProfile: any, 
  onSwitchTab?: (tab: string) => void 
}) {
  const [selectedUniId, setSelectedUniId] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const [isUniListExpanded, setIsUniListExpanded] = useState(false);

  // Profile Viewing state
  const [viewingProfile, setViewingProfile] = useState<PublicProfile | null>(null);
  const [followedHandles, setFollowedHandles] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("universe_followed_handles");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("universe_followed_handles", JSON.stringify(Array.from(followedHandles)));
  }, [followedHandles]);

  const toggleFollow = (handle: string) => {
    setFollowedHandles(prev => {
      const next = new Set(prev);
      if (next.has(handle)) next.delete(handle);
      else next.add(handle);
      return next;
    });
  };

  // Active Story viewer modal
  const [activeStory, setActiveStory] = useState<CampusStory | null>(null);
  const [storyReactions, setStoryReactions] = useState<{ [key: string]: number }>({});
  const [storyBubbleComments, setStoryBubbleComments] = useState<string[]>([]);
  const [newStoryComment, setNewStoryComment] = useState("");

  // Gamification dashboard
  const [studentKarma, setStudentKarma] = useState(480);
  const [banterStreak, setBanterStreak] = useState(7);

  // Trending board hashtags list
  const trendingTags = [
    { tag: "#NaijaCAStress", count: 2450, desc: "Students complaining about surprise tests" },
    { tag: "#NairashiftMarket", count: 980, desc: "High student listing traffic of used solar fans" },
    { tag: "#GST101Notes", count: 740, desc: "Crowdsourcing the historical Nok metallurgy slides" }
  ];

  // Feed selection presets & dynamic user input post arrays
  const [posts, setPosts] = useState<InteractivePost[]>([
    {
      id: "pinned-announcement",
      universityId: "all",
      authorName: "UniVerse Official",
      authorHandle: "universe_hq",
      authorRole: "Admin",
      avatarBg: "bg-emerald-600 font-extrabold",
      timestamp: "Just Now",
      category: "announcements",
      title: "One Campus. Infinite Connections.",
      content: "UniVerse is the all-in-one social ecosystem built strictly for students! 🚀 \n\nEverything you need, in one place: \n✨ Campus Feed (What's happening)\n📚 Academic Hub (Past Questions, Notes)\n📦 Marketplace (Buy/Sell locally)\n🤝 Communities & Opportunities\n\nDownload the app and be part of the movement. Join 50k+ active students building the future today! 🌍✨ #OneCampus #UniVerseAfrica",
      likes: 1242,
      commentsCount: 89,
      hasLiked: true,
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop", 
      locationDetail: "UniVerse Global Node",
      hashtags: ["#OneCampus", "#UniVerseAfrica", "#StudentEmpowerment"],
      comments: [
        { id: "c-uv-1", author: "Sam Student", handle: "sam_oau", avatarBg: "bg-emerald-500", text: "This is exactly what we needed! UI is so clean.", timestamp: "2m ago", likes: 12 }
      ]
    }
  ]);

  // Story high-key moments presets
  const [stories, setStories] = useState<CampusStory[]>([
    {
      id: "demo-story-1",
      authorName: "Samuel Taiwo",
      authorHandle: "sam_unilag",
      avatarBg: "bg-blue-500",
      uni: "UNILAG",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800&auto=format&fit=crop",
      caption: "Libraries are full but vibes are peak! #ExamSeason",
      views: "1.2k",
      likes: "450",
      shares: "12",
      tags: ["joy_uniuyo"],
      timestamp: "2h ago"
    },
    {
      id: "demo-story-2",
      authorName: "Joy Okon",
      authorHandle: "joy_uniuyo",
      avatarBg: "bg-pink-500",
      uni: "UNIUYO",
      mediaType: "video",
      mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-walking-on-a-college-campus-41487-large.mp4",
      caption: "Early morning lectures shouldn't be a thing 😴",
      views: "850",
      likes: "320",
      shares: "5",
      tags: ["sam_unilag", "emeka_unn"],
      timestamp: "4h ago"
    }
  ]);

  // Story Creator states
  const [showStoryPublisher, setShowStoryPublisher] = useState(false);
  const [newStoryMedia, setNewStoryMedia] = useState<{ url: string; type: "image" | "video" } | null>(null);
  const [newStoryCaption, setNewStoryCaption] = useState("");
  const [newStoryTags, setNewStoryTags] = useState<string[]>([]);
  const [isUploadingStory, setIsUploadingStory] = useState(false);

  const handleStoryMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewStoryMedia({
        url: reader.result as string,
        type: file.type.startsWith("video") ? "video" : "image"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCreateStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryMedia) return;

    setIsUploadingStory(true);

    // Simulate upload delay
    setTimeout(() => {
      const newStory: CampusStory = {
        id: `story-${Date.now()}`,
        authorName: userProfile.name,
        authorHandle: userProfile.handle,
        avatarBg: userProfile.avatar ? "" : "bg-emerald-500",
        uni: userProfile.university?.substring(0, 7) || "UNI",
        mediaType: newStoryMedia.type,
        mediaUrl: newStoryMedia.url,
        caption: newStoryCaption,
        views: "0",
        likes: "0",
        shares: "0",
        tags: newStoryTags,
        timestamp: "Just now"
      };

      setStories([newStory, ...stories]);
      setNewStoryMedia(null);
      setNewStoryCaption("");
      setNewStoryTags([]);
      setShowStoryPublisher(false);
      setIsUploadingStory(false);
      setStudentKarma(prev => prev + 20);
    }, 1500);
  };

  // Dynamic state for adding comments inline
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [pendingCommentText, setPendingCommentText] = useState("");

  // New Post Creator states
  const [showPublisher, setShowPublisher] = useState<boolean>(false);
  const [newPostContent, setNewPostContent] = useState<string>("");
  const [newPostCategory, setNewPostCategory] = useState<InteractivePost["category"]>("buzz");
  const [newPostTitle, setNewPostTitle] = useState<string>("");
  const [newPostPrice, setNewPostPrice] = useState<string>("");
  const [newPostLocation, setNewPostLocation] = useState<string>("");
  const [newPostDepartment, setNewPostDepartment] = useState<string>("");
  const [newPostHashtags, setNewPostHashtags] = useState<string>("");
  const [mockMediaSelect, setMockMediaSelect] = useState<"none" | "image" | "video">("none");
  const [visualFilter, setVisualFilter] = useState<string>("none");
  const [newPostMedia, setNewPostMedia] = useState<{ url: string; type: "image" | "video" } | null>(null);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPostMedia({
        url: reader.result as string,
        type: file.type.startsWith("video") ? "video" : "image"
      });
    };
    reader.readAsDataURL(file);
  };

  // Live simulation of speaker cycle
  useEffect(() => {
    const handleOpenPublisher = () => {
      setShowPublisher(true);
    };
    window.addEventListener("open-post-publisher", handleOpenPublisher);
    return () => {
      window.removeEventListener("open-post-publisher", handleOpenPublisher);
    };
  }, []);

  // Upvote/Like Post Functionality
  const handleLikePost = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLikedNow = !post.hasLiked;
          return {
            ...post,
            hasLiked: isLikedNow,
            likes: isLikedNow ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
    // Add gamification karma
    setStudentKarma(prev => prev + 2);
  };

  // Submit Comments
  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!pendingCommentText.trim()) return;

    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: `comm-user-${Date.now()}`,
            author: userProfile.name,
            handle: userProfile.handle,
            avatarBg: userProfile.avatar ? "" : "bg-emerald-500 font-bold",
            text: pendingCommentText,
            timestamp: "Just now",
            likes: 0
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
            commentsCount: post.commentsCount + 1
          };
        }
        return post;
      })
    );

    setPendingCommentText("");
    // Give user karma points!
    setStudentKarma(prev => prev + 5);
  };

  // Submit dynamic Story comment
  const handleAddStoryComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryComment.trim()) return;
    setStoryBubbleComments(prev => [...prev, `You: ${newStoryComment}`]);
    setNewStoryComment("");
    setStudentKarma(prev => prev + 3);
  };

  // Repost system (Twitter Retweet mechanism)
  const handleRepost = (post: InteractivePost) => {
    const isAlreadyReposted = posts.some(p => p.repostedFrom?.authorHandle === post.authorHandle);
    if (isAlreadyReposted) {
      alert("You already buzzed this post onto your campus feed!");
      return;
    }

    const repostedItem: InteractivePost = {
      id: `repost-${Date.now()}`,
      universityId: selectedUniId === "all" ? post.universityId : selectedUniId,
      authorName: userProfile.name,
      authorHandle: userProfile.handle,
      authorRole: "Student",
      avatarBg: userProfile.avatar ? "" : "bg-emerald-500",
      timestamp: "Just now",
      category: "buzz",
      content: `Whoa, abeg look at this update! Highly relevant for everyone. Check details below!`,
      likes: 1,
      commentsCount: 0,
      hashtags: post.hashtags,
      comments: [],
      repostedFrom: {
        authorName: post.authorName,
        authorHandle: post.authorHandle,
        content: post.content.substring(0, 150) + (post.content.length > 150 ? "..." : "")
      }
    };

    setPosts([repostedItem, ...posts]);
    setStudentKarma(prev => prev + 8);
  };

  // Publish new post
  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const parsedHashtags = newPostHashtags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => (tag.startsWith("#") ? tag : `#${tag}`));

    // Find the user's university ID
    const userMatchedUni = universities.find(u => 
      u.id !== "all" && userProfile.university?.includes(u.abbreviation)
    );
    const resolvedUniId = selectedUniId === "all" 
      ? (userMatchedUni ? userMatchedUni.id : "oau") 
      : selectedUniId;

    const customPost: InteractivePost = {
      id: `custom-post-${Date.now()}`,
      universityId: resolvedUniId,
      authorName: userProfile.name,
      authorHandle: userProfile.handle,
      authorRole: "Student",
      authorDepartment: userProfile.department,
      avatarBg: userProfile.avatar ? "" : "bg-emerald-500",
      timestamp: "Just now",
      category: newPostCategory,
      title: newPostTitle.trim() ? newPostTitle : undefined,
      content: newPostContent + " " + parsedHashtags.join(" "),
      likes: 1,
      commentsCount: 0,
      hasLiked: true,
      price: newPostCategory === "marketplace" ? (newPostPrice ? `₦${newPostPrice}` : undefined) : undefined,
      locationDetail: newPostLocation.trim() ? newPostLocation : userProfile.hostel || "Campus Node",
      department: newPostDepartment.trim() ? newPostDepartment : undefined,
      hashtags: parsedHashtags,
      comments: [],
      mediaType: newPostMedia?.type,
      mediaUrl: newPostMedia?.url
    };

    setPosts([customPost, ...posts]);
    setNewPostContent("");
    setNewPostTitle("");
    setNewPostHashtags("");
    setNewPostPrice("");
    setNewPostLocation("");
    setNewPostDepartment("");
    setNewPostMedia(null);
    setMockMediaSelect("none");
    setShowPublisher(false);

    // Boost gamified metrics
    setStudentKarma(prev => prev + 15);
    setBanterStreak(prev => prev + 1);
  };

  // Filter posts based on School, Category, and Hashtags
  const filteredPosts = posts.filter(post => {
    let matchSchool = selectedUniId === "all" || post.universityId === selectedUniId;
    
    let matchCategory = true;
    if (activeCategory === "following") {
      matchCategory = followedHandles.has(post.authorHandle);
    } else if (activeCategory === "my-department") {
      // Show posts from the user's department AND user's university, bypassing selectedUniId
      matchSchool = true;
      const userDept = userProfile.department?.toLowerCase().trim();
      const postDept = post.authorDepartment?.toLowerCase().trim();
      
      const userMatchedUni = universities.find(u => 
        u.id !== "all" && userProfile.university?.includes(u.abbreviation)
      );
      const userUniId = userMatchedUni ? userMatchedUni.id : "oau";

      matchCategory = !!(userDept && postDept && userDept === postDept && post.universityId === userUniId);
    } else if (activeCategory !== "all") {
      matchCategory = post.category === activeCategory as any;
    }

    const matchHashtag = !selectedHashtag || post.content.toLowerCase().includes(selectedHashtag.toLowerCase());
    return matchSchool && matchCategory && matchHashtag;
  });

  return (
    <div id="social-buzz-engine" className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn text-left">
      
      {/* ----------------- COLUMN 1: STUDENT PROFILE & FEED CONTROLS (3/12 cols) ----------------- */}
      <div className="lg:col-span-3 xl:col-span-2 space-y-4">
        
        {/* GAMIFIED STUDENT CARD */}
        <div id="gamified-profile-card" className="bg-[#151B2B] rounded-2xl border border-white/10 p-5 space-y-4 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${userProfile.avatar ? '' : 'bg-emerald-500'} rounded-xl flex items-center justify-center text-white font-bold text-lg border border-emerald-400/20 shadow-md overflow-hidden`}>
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
              ) : (
                userProfile.name[0]
              )}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="text-sm font-bold text-white leading-none truncate max-w-[120px]">{userProfile.name}</h4>
                <span className="text-[8px] font-mono px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-bold uppercase rounded border border-emerald-500/30 shrink-0">
                  {userProfile.university?.includes('(') ? userProfile.university.split('(')[1]?.replace(')', '') : (userProfile.university?.substring(0, 3) || 'UNI')}
                </span>
              </div>
              <p className="text-[10px] text-white/40 font-mono mt-1 text-left">@{userProfile.handle}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-center">
            <div className="bg-[#0A0F1E] border border-white/5 p-2 rounded-xl">
              <span className="text-[9px] uppercase font-mono text-white/40 block leading-none">Reputation IQ</span>
              <span className="text-sm font-bold font-mono text-emerald-400 mt-1 block flex items-center justify-center gap-0.5">
                <Award className="w-3.5 h-3.5" /> {studentKarma}
              </span>
            </div>

            <div className="bg-[#0A0F1E] border border-white/5 p-2 rounded-xl">
              <span className="text-[9px] uppercase font-mono text-white/40 block leading-none">Banter Streak</span>
              <span className="text-sm font-bold font-mono text-amber-400 mt-1 block flex items-center justify-center gap-0.5">
                <Flame className="w-3.5 h-3.5 animate-pulse" /> {banterStreak} days
              </span>
            </div>
          </div>

          {/* Locked achievement status cards */}
          <div className="space-y-1.5">
            <p className="text-[9px] font-mono uppercase tracking-wider text-white/45">Earned Campus Badges</p>
            <div className="flex flex-wrap gap-1">
              <span className="text-[9px] font-bold px-2 py-0.5 bg-purple-500/15 text-purple-400 border border-purple-500/20 rounded font-sans flex items-center gap-1 shadow-xs">
                🥇 Past-Paper King
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 bg-blue-500/15 text-blue-400 border border-blue-500/20 rounded font-sans flex items-center gap-1 shadow-xs opacity-50">
                🔒 Nairaloop Hero
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/20 rounded font-sans flex items-center gap-1 shadow-xs">
                🔥 Hot Banter Rep
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ----------------- COLUMN 2: THE HOT FEEDS STREAM (6/12 cols) ----------------- */}
      <div className="lg:col-span-6 xl:col-span-8 space-y-6 relative">
        
        {/* APP BACKGROUND WATERMARK */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex flex-col items-center justify-center opacity-[0.03] grayscale transition-opacity duration-1000 group-hover:opacity-[0.05]">
          <UniVerseLogo size={600} animate={true} orbitSpeed={0.15} glow={false} />
          <h2 className="text-8xl font-black uppercase tracking-tighter mt-8">UniVerse</h2>
          <p className="text-xl font-bold uppercase tracking-[0.3em] mt-2 text-center">Smart Campus Community</p>
        </div>

        {/* FEED TABS: FOR YOU | CAMPUS | MY DEPT | FOLLOWING */}
        <div id="feed-tabs-top" className="flex border-b border-white/10 mt-0 bg-[#070B16]/40 backdrop-blur-md sticky top-16 z-20 rounded-t-2xl">
          {["For You", "Campus", "My Dept", "Following"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                (tab === "For You" && activeCategory === "all") || 
                (tab === "Campus" && activeCategory === "buzz") || 
                (tab === "My Dept" && activeCategory === "my-department") || 
                (tab === "Following" && activeCategory === "following")
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              onClick={() => {
                if (tab === "For You") setActiveCategory("all");
                if (tab === "Campus") setActiveCategory("buzz");
                if (tab === "My Dept") {
                  if (!userProfile.department) {
                    alert("Please update your department in your Profile first to use this feed.");
                  } else {
                    setActiveCategory("my-department");
                  }
                }
                if (tab === "Following") setActiveCategory("following");
              }}
            >
              {tab}
              {((tab === "For You" && activeCategory === "all") || 
                (tab === "Campus" && activeCategory === "buzz") || 
                (tab === "My Dept" && activeCategory === "my-department") || 
                (tab === "Following" && activeCategory === "following")) && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-500 rounded-t-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              )}
            </button>
          ))}
        </div>

        {/* TIKTOK / INSTAGRAM STYLE HIGH-KEY MOMENTS (STORIES) */}
        <div id="stories-segment" className="animate-fadeIn space-y-3 relative z-10">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
            <button
              onClick={() => setShowStoryPublisher(true)}
              className="flex-shrink-0 flex flex-col items-center space-y-2 focus:outline-none cursor-pointer group"
            >
              <div className="relative p-[1px] rounded-full border-2 border-dashed border-white/20 group-hover:border-indigo-400 transition-all">
                <div className="w-15 h-15 rounded-full bg-[#151B2B] flex items-center justify-center border-2 border-[#0A0F1E] overflow-hidden">
                   <div className={`w-full h-full ${userProfile.avatar ? '' : 'bg-emerald-500'} flex items-center justify-center font-black text-white text-lg`}>
                      {userProfile.avatar ? (
                        <img src={userProfile.avatar} alt="Me" className="w-full h-full object-cover" />
                      ) : (
                        userProfile.name[0]
                      )}
                   </div>
                   <div className="absolute bottom-0 right-0 w-5 h-5 bg-indigo-500 rounded-full border-2 border-[#0A0F1E] flex items-center justify-center shadow-lg">
                     <Plus className="w-3 h-3 text-white" />
                   </div>
                </div>
              </div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Your Story</span>
            </button>

            {stories.map((story) => (
              <button
                id={`story-btn-${story.id}`}
                key={story.id}
                onClick={() => {
                  setActiveStory(story);
                  setStoryReactions({ fireOrder: 12, sweatOrder: 5, laughOrder: 22 });
                  setStoryBubbleComments(["Banter is too high key", "Great Ife never carry last!"]);
                }}
                className="flex-shrink-0 group flex flex-col items-center space-y-2 focus:outline-none cursor-pointer"
              >
                <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-emerald-400 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <div className="w-14.5 h-14.5 rounded-full border-2 border-[#0A0F1E] bg-[#151B2B] overflow-hidden flex items-center justify-center font-black text-white text-sm">
                    {story.authorHandle === userProfile.handle && userProfile.avatar ? (
                       <img src={userProfile.avatar} alt={story.authorName} className="w-full h-full object-cover" />
                    ) : (
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.authorHandle}`} 
                        alt={story.authorName} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-white/70 font-bold truncate max-w-[70px] tracking-tight">{story.authorName.split(" ")[0]}</span>
              </button>
            ))}

            {/* ADD STORY BUTTON (EXTRA) */}
            <button 
              onClick={() => setShowStoryPublisher(true)}
              className="flex-shrink-0 flex flex-col items-center space-y-2 focus:outline-none cursor-pointer group"
            >
              <div className="w-15 h-15 rounded-full border-2 border-white/5 bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:bg-white/10 transition-all">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Add Story</span>
            </button>
          </div>
        </div>

        {/* FEED CONFIGURATION & POST GENERATOR / CAMPUS CHANNELS */}
        <div className="bg-[#151B2B]/60 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-4 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider font-mono text-emerald-400">Campus Channels</span>
            
            <button
              onClick={() => setShowPublisher(!showPublisher)}
              className="bg-emerald-500 hover:bg-emerald-600 font-bold text-white px-3.5 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <PenSquare className="w-3.5 h-3.5" /> Speak Your Mind...
            </button>
          </div>

          <div className="flex flex-wrap gap-1 bg-[#0A0F1E] p-1 rounded-xl border border-white/5">
            {[
              { id: "all", label: "🔥 All Gossip" },
              { id: "buzz", label: "💬 Lounge Chat" },
              { id: "announcements", label: "📢 Course Syncs" },
              { id: "marketplace", label: "📦 Student Store" },
              { id: "gigs", label: "💼 Gig Loop" },
            ].map((chan) => (
              <button
                key={chan.id}
                onClick={() => {
                  setActiveCategory(chan.id);
                  setSelectedHashtag(null); // Clear tag filters
                }}
                className={`flex-1 min-w-fit text-center px-2 py-1 rounded-lg text-[10px] font-bold tracking-tight transition-all cursor-pointer ${
                  activeCategory === chan.id 
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" 
                    : "text-white/40 hover:text-white"
                }`}
              >
                {chan.label}
              </button>
            ))}
          </div>
        </div>

        {/* NEW ADVANCED POST COMPOSER */}
        {showPublisher && (
          <form onSubmit={handleCreatePostSubmit} className="bg-[#151B2B] border border-emerald-500/40 rounded-2xl p-5 space-y-4 animate-fadeIn relative">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-emerald-400" /> Share Campus Gossip or Academic File
              </span>
              <button type="button" onClick={() => setShowPublisher(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[9px] uppercase font-bold text-white/40 font-mono mb-1">Channel Section</label>
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value as InteractivePost["category"])}
                  className="w-full text-xs rounded-lg border border-white/5 bg-[#0A0F1E] p-2 text-white"
                >
                  <option value="buzz">💬 Lounge Gossip / Banter Group</option>
                  <option value="announcements">📢 Academic CA Announcements</option>
                  <option value="marketplace">📦 Peer-to-Peer Marketplace</option>
                  <option value="gigs">💼 Instant Campus Gigs & Tutorials</option>
                </select>
              </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[9px] uppercase font-bold text-white/40 font-mono mb-1">Broadcasting Area</label>
                <input
                  type="text"
                  placeholder="e.g. Angola C Block, Moremi Hall LT 2"
                  value={newPostLocation}
                  onChange={(e) => setNewPostLocation(e.target.value)}
                  className="w-full text-xs rounded-lg border border-white/5 bg-[#0A0F1E] p-2 text-white placeholder-white/25"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-white/40 font-mono mb-1">Departmental Notice (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science, Faculty of Law"
                  value={newPostDepartment}
                  onChange={(e) => setNewPostDepartment(e.target.value)}
                  className="w-full text-xs rounded-lg border border-white/5 bg-[#0A0F1E] p-2 text-white placeholder-white/25"
                />
              </div>
            </div>
            </div>

            {newPostCategory === "marketplace" && (
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-white/40 font-mono mb-1">Target Price (Naira)</label>
                  <input
                    type="number"
                    placeholder="e.g. 15000"
                    value={newPostPrice}
                    onChange={(e) => setNewPostPrice(e.target.value)}
                    className="w-full text-xs rounded-lg border border-white/5 bg-[#0A0F1E] p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-white/40 font-mono mb-1">Condition Status</label>
                  <span className="block text-[10px] text-white/40 italic p-2 bg-[#0A0F1E] rounded-lg">Negotiable by Direct DM</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[9px] uppercase font-bold text-white/40 font-mono mb-1">Title Target (Optional description focus)</label>
              <input
                type="text"
                placeholder="GST 101 Test Warning, Used solar fan, Python developer needed..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="w-full text-xs rounded-lg border border-white/5 bg-[#0A0F1E] p-2 text-white placeholder-white/20"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase font-bold text-white/40 font-mono mb-1">Post Content Banter</label>
              <textarea
                rows={3}
                required
                placeholder="Say what's buzzing! Settle campus water struggles, complain about study groups, or coordinate group tutorials..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full text-xs rounded-lg border border-white/5 bg-[#0A0F1E] p-2 text-white placeholder-white/15"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[9px] uppercase font-bold text-white/40 font-mono mb-1">Hashtags (separated by comma)</label>
                <input
                  type="text"
                  placeholder="#NaijaCAStress, #ExamPrep"
                  value={newPostHashtags}
                  onChange={(e) => setNewPostHashtags(e.target.value)}
                  className="w-full text-xs rounded-lg border border-white/5 bg-[#0A0F1E] p-2 text-white placeholder-white/20 font-mono"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-white/40 font-mono mb-1">Attach Photo or Video</label>
                <div className="flex gap-2">
                  <label className={`flex-1 p-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                    newPostMedia?.type === "image" 
                      ? "bg-purple-500/20 text-purple-400 border-purple-500/30" 
                      : "bg-[#0A0F1E] border-white/5 text-white/40 hover:bg-white/5"
                  }`}>
                    <input type="file" accept="image/*" className="hidden" onChange={handleMediaUpload} />
                    <ImageIcon className="w-3.5 h-3.5" /> {newPostMedia?.type === "image" ? "Change Image" : "Add Image"}
                  </label>
                  <label className={`flex-1 p-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                    newPostMedia?.type === "video" 
                      ? "bg-rose-500/20 text-rose-400 border-rose-500/30" 
                      : "bg-[#0A0F1E] border-white/5 text-white/40 hover:bg-white/5"
                  }`}>
                    <input type="file" accept="video/*" className="hidden" onChange={handleMediaUpload} />
                    <Video className="w-3.5 h-3.5" /> {newPostMedia?.type === "video" ? "Change Video" : "Add Video"}
                  </label>
                </div>
              </div>
            </div>

            {/* Media Preview Box */}
            {newPostMedia && (
              <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#0A0F1E]">
                {newPostMedia.type === "image" ? (
                  <img src={newPostMedia.url} alt="Preview" className="w-full max-h-[300px] object-cover" />
                ) : (
                  <video src={newPostMedia.url} className="w-full max-h-[300px] object-cover" controls />
                )}
                <button 
                  type="button"
                  onClick={() => setNewPostMedia(null)}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-rose-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Simulated photographic filters */}
            {mockMediaSelect !== "none" && (
              <div className="p-2.5 bg-[#0A0F1E] border border-white/5 rounded-xl space-y-2">
                <span className="text-[8px] font-mono text-white/40 uppercase block">Apply High-Traction Filter Theme</span>
                <div className="flex gap-2">
                  {["none", "Crema Glow", "Vintage Academic", "Tech High contrast"].map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setVisualFilter(filter)}
                      className={`px-2.5 py-1 rounded text-[9px] font-bold capitalize transition-all cursor-pointer ${
                        visualFilter === filter 
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                          : "bg-white/5 text-white/40 hover:bg-white/10"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 text-right pt-2">
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 font-bold text-white px-5 py-2.5 rounded-xl text-xs transition-shadow shadow-[0_0_15px_rgba(16,185,129,0.35)] cursor-pointer"
              >
                Broadcast Post 🔥 (+15 Karma)
              </button>
            </div>
          </form>
        )}

        {/* FEED FILTER TAG BANNER */}
        {selectedHashtag && (
          <div className="bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 p-3 rounded-xl border border-emerald-500/20 flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-400 flex items-center gap-1">
              <Hash className="w-3.5 h-3.5" /> Filtering for updates containing <strong className="text-white font-mono">{selectedHashtag}</strong>
            </span>
            <button
              onClick={() => setSelectedHashtag(null)}
              className="text-[10px] text-white/50 bg-[#0A0F1E] px-2 py-0.5 border border-white/10 rounded cursor-pointer"
            >
              Clear tag Filter
            </button>
          </div>
        )}

        {/* FEED INJECT COMPONENT: POST STREAM */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center bg-[#151B2B] rounded-2xl border border-white/5 space-y-2">
              <p className="text-sm font-semibold text-white/60">No active students spoke in this category yet.</p>
              <p className="text-xs text-white/30">Be the pioneer student! Click 'Speak Your Mind' to make the first post.</p>
            </div>
          ) : (
            <>
              {filteredPosts.map((post, index) => {
                const university = (universities || []).find(u => u.id === post.universityId);
                const uniAbbr = university?.abbreviation || "NET";
                const isCommentOpen = activeCommentPostId === post.id;
                const showAd = !isPremium && index === 1;

                return (
                  <React.Fragment key={post.id}>
                    <div className="bg-[#151B2B]/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 sm:p-8 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-indigo-500/20 transition-all group duration-500 relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/5 to-transparent pointer-events-none" />
                  
                  {/* POST AUTHOR METADATA ROW */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div 
                        onClick={() => setViewingProfile({
                          name: post.authorName,
                          handle: post.authorHandle,
                          role: post.authorRole,
                          avatarBg: post.avatarBg,
                          location: post.locationDetail,
                          likes: post.likes,
                          commentsCount: post.commentsCount
                        })}
                        className={`w-12 h-12 ${post.avatarBg} rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-xl border border-white/10 ring-1 ring-white/10 group-hover:ring-indigo-500/30 transition-all duration-500 cursor-pointer`}
                      >
                        {post.authorName[0]}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span 
                            onClick={() => setViewingProfile({
                              name: post.authorName,
                              handle: post.authorHandle,
                              role: post.authorRole,
                              avatarBg: post.avatarBg,
                              location: post.locationDetail,
                              likes: post.likes,
                              commentsCount: post.commentsCount
                            })}
                            className="text-[15px] font-black text-white group-hover:text-indigo-300 transition-colors tracking-tight uppercase cursor-pointer"
                          >
                            {post.authorName}
                          </span>
                          <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                          <span className="text-[10px] font-bold text-indigo-400 font-mono uppercase tracking-widest">{post.authorRole}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-[0.1em] flex items-center gap-1.5 leading-none">
                          {uniAbbr} <span className="text-zinc-700">•</span> {post.timestamp}
                          {post.department && (
                            <>
                              <div className="w-1 h-1 bg-emerald-500/40 rounded-full" />
                              <span className="text-emerald-400"># {post.department}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button className="p-2 text-zinc-600 hover:text-white hover:bg-white/5 rounded-full transition-all cursor-pointer">
                        <Bookmark className="w-4.5 h-4.5" />
                      </button>
                      <button className="p-2 text-zinc-600 hover:text-white hover:bg-white/5 rounded-full transition-all cursor-pointer">
                        <MoreVertical className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>

                  {/* POST CORE CONTENT SECTION */}
                  <div className="space-y-4 px-1 relative z-10">
                    {post.title && (
                      <h4 className="text-lg font-black text-white font-display tracking-tight leading-tight uppercase italic drop-shadow-sm">
                        {post.title}
                      </h4>
                    )}
                    <p className="text-[15px] text-zinc-300 leading-relaxed font-medium">
                      {post.content}
                    </p>

                    {/* Media attachments */}
                    {post.mediaUrl && (
                      <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group-hover:border-indigo-500/20 transition-all duration-700">
                        {post.mediaType === "video" ? (
                          <video 
                            src={post.mediaUrl} 
                            className="w-full object-cover max-h-[450px]" 
                            controls={false}
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <img 
                            src={post.mediaUrl} 
                            alt="Campus feed media" 
                            className="w-full object-cover max-h-[450px] hover:scale-105 transition-transform duration-1000" 
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {post.mediaType === "video" ? <Radio className="w-4 h-4 text-white animate-pulse" /> : <ImageIcon className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    )}

                    {/* Specialized Marketplace / Shop Attributes */}
                    {post.category === "marketplace" && (
                      <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-2 text-indigo-300 font-black text-sm uppercase italic text-left">
                          <Tag className="w-4 h-4" /> Price: {post.price || "Contact for bargain"}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5" /> {post.locationDetail}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* INTERACTIVE ACTIONS BOX */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                    <div className="flex items-center gap-8">
                      <button 
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-2.5 transition-all cursor-pointer group/btn ${post.hasLiked ? "text-rose-500" : "text-zinc-500 hover:text-rose-400"}`}
                      >
                        <div className={`p-2 rounded-xl transition-all ${post.hasLiked ? "bg-rose-500/10" : "group-hover/btn:bg-rose-500/5"}`}>
                          <Heart className={`w-5 h-5 ${post.hasLiked ? "fill-current" : ""}`} />
                        </div>
                        <span className="text-[13px] font-black tracking-tighter">{post.likes}</span>
                      </button>
                      
                      <button 
                        onClick={() => setActiveCommentPostId(isCommentOpen ? null : post.id)}
                        className={`flex items-center gap-2.5 transition-all cursor-pointer group/btn ${isCommentOpen ? "text-indigo-400" : "text-zinc-500 hover:text-indigo-300"}`}
                      >
                        <div className={`p-2 rounded-xl transition-all ${isCommentOpen ? "bg-indigo-500/10" : "group-hover/btn:bg-indigo-500/5"}`}>
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <span className="text-[13px] font-black tracking-tighter">{post.commentsCount}</span>
                      </button>
                      
                      <button 
                        onClick={() => handleRepost(post)}
                        className="flex items-center gap-2.5 text-zinc-500 hover:text-emerald-400 transition-all cursor-pointer group/btn"
                      >
                        <div className="p-2 rounded-xl group-hover/btn:bg-emerald-500/5 transition-all">
                          <Share2 className="w-5 h-5" />
                        </div>
                        <span className="text-[13px] font-black tracking-tighter">Buzzed</span>
                      </button>
                    </div>
                    
                    <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all cursor-pointer group/btn px-3 py-2 hover:bg-white/5 rounded-xl">
                      <Send className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* COMMENT SECTION PANEL ACCORDION */}
                  {isCommentOpen && (
                    <div className="bg-[#0A0F1E]/60 border border-white/5 rounded-xl p-3 space-y-3.5 animate-fadeIn">
                      
                      {/* Interactive Comments scroll area */}
                      <div className="space-y-2 max-h-[190px] overflow-y-auto">
                        {post.comments.length === 0 ? (
                          <p className="text-[10px] text-white/30 italic py-1 text-center">Zero chatter in this chain yet.</p>
                        ) : (
                          post.comments.map((comm) => (
                            <div key={comm.id} className="p-2 bg-[#151B2B]/60 rounded-lg space-y-1 border border-white/5">
                              <div className="flex items-center justify-between text-[10px]">
                                <span 
                                  onClick={() => setViewingProfile({
                                    name: comm.author,
                                    handle: comm.handle,
                                    avatarBg: comm.avatarBg,
                                    role: "Student",
                                    likes: comm.likes
                                  })}
                                  className="font-bold text-emerald-400 font-sans cursor-pointer hover:underline"
                                >
                                  @{comm.handle}
                                </span>
                                <span className="text-white/30 font-mono">{comm.timestamp}</span>
                              </div>
                              <p className="text-xs text-white/70 font-semibold">{comm.text}</p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Write Comment Form */}
                      <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex items-center gap-1 bg-slate-900 border border-white/10 rounded-lg p-1">
                        <input
                          type="text"
                          required
                          placeholder="Reply with some hot Naija slang..."
                          value={pendingCommentText}
                          onChange={(e) => setPendingCommentText(e.target.value)}
                          className="flex-1 bg-transparent px-2.5 py-1 text-xs text-white focus:outline-none placeholder-white/20"
                        />
                        <button type="submit" className="p-1 px-3 bg-emerald-500 hover:bg-emerald-600 rounded-md text-white font-bold cursor-pointer">
                          <Send className="w-3 h-3" />
                        </button>
                      </form>

                    </div>
                    )}
                  </div>

                  {/* SPONSORED INJECTED AD */}
                    {showAd && (
                      <div className="bg-gradient-to-br from-indigo-900/40 to-black p-8 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl relative overflow-hidden group/ad animate-fadeIn my-6">
                        <div className="absolute top-0 right-0 p-4">
                          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest font-mono">Sponsored Ad</span>
                        </div>
                        <div className="flex gap-6 items-center">
                          <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center p-2">
                            <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
                          </div>
                          <div className="flex-1 space-y-2 text-left">
                            <h4 className="text-lg font-black text-white italic uppercase tracking-tight">Unlock UniVerse Pro</h4>
                            <p className="text-[13px] text-zinc-400 font-medium">Remove all sessional interruptions and boost your Gig discovery rate by 300%.</p>
                            <div className="flex items-center gap-4 pt-2">
                              <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer">
                                Learn More
                              </button>
                              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Ad frequency: 8m</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </>
          )}
        </div>

      </div>

      {/* ----------------- COLUMN 3: TRENDS & STRATEGIES (3/12 cols) ----------------- */}
      <div className="lg:col-span-3 xl:col-span-2 space-y-4">
        
        {/* TWITTER/X STYLE HOT TRENDING HASHTAGS BOARD */}
        <div id="trending-tags-board" className="bg-[#151B2B] rounded-2xl border border-white/10 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Buzzing Trends
            </h4>
            <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase font-sans">Naija Campus</span>
          </div>

          <p className="text-[10px] text-white/40 leading-relaxed font-semibold">
            Click any hashtag trending above to instantly filter the conversation streams.
          </p>

          <div className="space-y-2.5">
            {trendingTags.map((trend) => {
              const active = selectedHashtag === trend.tag;
              return (
                <button
                  id={`trend-btn-${trend.tag}`}
                  key={trend.tag}
                  onClick={() => {
                    setSelectedHashtag(active ? null : trend.tag);
                  }}
                  className={`w-full text-left rounded-lg transition-all border p-2 flex flex-col justify-start items-start cursor-pointer ${
                    active 
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 text-emerald-300 font-bold" 
                      : "bg-[#0A0F1E] border-white/5 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[11px] font-bold tracking-tight text-white font-mono break-all">{trend.tag}</span>
                    <span className="text-[9px] text-emerald-400 px-1 bg-emerald-500/10 rounded tracking-tighter">{(trend.count / 1000).toFixed(1)}k</span>
                  </div>
                  <p className="text-[9px] text-white/40 leading-snug mt-1 font-semibold overflow-hidden text-ellipsis line-clamp-1">{trend.desc}</p>
                </button>
              );
            })}
          </div>

          {selectedHashtag && (
            <button
              onClick={() => setSelectedHashtag(null)}
              className="w-full text-center text-[9px] font-mono text-white/40 uppercase tracking-widest pt-2.5 hover:text-white mt-1 border-t border-white/5 block"
            >
              Clear trending Filter
            </button>
          )}
        </div>


      </div>

      {/* PUBLIC PROFILE VIEWER MODAL */}
      {viewingProfile && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#151B2B] w-full max-w-sm rounded-[2.5rem] border border-white/10 overflow-hidden relative shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            <button 
              onClick={() => setViewingProfile(null)}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header Background */}
            <div className={`h-32 w-full ${viewingProfile.avatarBg || "bg-indigo-600"} opacity-20 relative`}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#151B2B] to-transparent" />
            </div>

            <div className="px-8 pb-8 -mt-12 relative z-10 text-center">
              <div className={`w-24 h-24 mx-auto ${viewingProfile.avatarBg || "bg-indigo-600"} rounded-[2rem] flex items-center justify-center font-black text-white text-4xl shadow-2xl border-4 border-[#151B2B] mb-4`}>
                {viewingProfile.name[0]}
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">{viewingProfile.name}</h3>
                <p className="text-sm font-mono text-indigo-400 font-bold">@{viewingProfile.handle}</p>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="text-center">
                  <span className="block text-xl font-black text-white">{(viewingProfile.likes || 0) + 120}</span>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Karma</span>
                </div>
                <div className="w-[1px] h-8 bg-white/5" />
                <div className="text-center">
                  <span className="block text-xl font-black text-white">{(viewingProfile.commentsCount || 0) + 42}</span>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Buzzes</span>
                </div>
              </div>

              <div className="mt-6 bg-[#0A0F1E] border border-white/5 rounded-2xl p-4 text-left">
                <div className="flex items-center gap-2 mb-2 text-zinc-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{viewingProfile.location || "Main Campus"}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed italic">
                  "Campus is a vibe. Studying hard and building the future at UniVerse."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <button 
                  onClick={() => toggleFollow(viewingProfile.handle)}
                  className={`py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    followedHandles.has(viewingProfile.handle)
                      ? "bg-white/5 text-emerald-400 border border-emerald-500/20"
                      : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:scale-105"
                  }`}
                >
                  {followedHandles.has(viewingProfile.handle) ? (
                    <>
                      <Check className="w-4 h-4" /> Following
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" /> Follow
                    </>
                  )}
                </button>
                <button 
                  onClick={() => {
                    setViewingProfile(null);
                    if (onSwitchTab) onSwitchTab("chat");
                  }}
                  className="py-4 rounded-2xl bg-indigo-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" /> Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- POPUP MODAL: STORY PUBLISHER ----------------- */}
      {showStoryPublisher && (
        <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#151B2B] w-full max-w-sm rounded-[3rem] border border-white/10 overflow-hidden relative shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> New Campus Moment
              </h3>
              <button onClick={() => setShowStoryPublisher(false)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStorySubmit} className="p-6 space-y-6">
              {/* Media Selection Area */}
              <div className="relative group aspect-[9/16] max-h-[350px] bg-[#0A0F1E] rounded-[2rem] border-2 border-dashed border-white/10 overflow-hidden flex flex-col items-center justify-center transition-all hover:border-emerald-500/30">
                {newStoryMedia ? (
                  <div className="absolute inset-0">
                    {newStoryMedia.type === "image" ? (
                      <img src={newStoryMedia.url} alt="Story Preview" className="w-full h-full object-cover" />
                    ) : (
                      <video src={newStoryMedia.url} className="w-full h-full object-cover" controls />
                    )}
                    <button 
                      type="button"
                      onClick={() => setNewStoryMedia(null)}
                      className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-rose-500 transition-colors z-20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-6 space-y-4">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                      <ImageIcon className="w-8 h-8 text-white/20" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/60">Capture or Upload Moment</p>
                      <p className="text-[10px] text-white/30 font-mono mt-1">Image or Video (Max 30s)</p>
                    </div>
                    <div className="flex gap-2">
                      <label className="flex-1 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest py-3 px-4 rounded-xl transition-all cursor-pointer border border-white/5">
                        <input type="file" accept="image/*" className="hidden" onChange={handleStoryMediaUpload} />
                        Photo
                      </label>
                      <label className="flex-1 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest py-3 px-4 rounded-xl transition-all cursor-pointer border border-white/5">
                        <input type="file" accept="video/*" className="hidden" onChange={handleStoryMediaUpload} />
                        Video
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Caption Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">The Vibe / Caption</label>
                <textarea
                  placeholder="What's the energy? Tag your geng..."
                  rows={2}
                  value={newStoryCaption}
                  onChange={(e) => setNewStoryCaption(e.target.value)}
                  className="w-full bg-[#0A0F1E] border border-white/5 rounded-2xl p-4 text-xs text-white placeholder-white/20 focus:border-indigo-500/30 transition-all outline-none resize-none"
                />
              </div>

              {/* Taggings */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Tag Campus Connections</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {frequentContacts.map((contact) => (
                    <button
                      key={contact.handle}
                      type="button"
                      onClick={() => {
                        setNewStoryTags(prev => 
                          prev.includes(contact.handle) 
                            ? prev.filter(h => h !== contact.handle) 
                            : [...prev, contact.handle]
                        );
                      }}
                      className={`flex-shrink-0 flex flex-col items-center gap-1.5 transition-all p-1 rounded-xl border ${
                        newStoryTags.includes(contact.handle)
                          ? "bg-indigo-500/20 border-indigo-500/40"
                          : "border-transparent"
                      }`}
                    >
                      <div className={`w-10 h-10 ${contact.avatarBg} rounded-full flex items-center justify-center text-[10px] font-black text-white border-2 ${
                        newStoryTags.includes(contact.handle) ? "border-indigo-400" : "border-white/5"
                      }`}>
                        {contact.name[0]}
                      </div>
                      <span className={`text-[8px] font-bold ${
                         newStoryTags.includes(contact.handle) ? "text-indigo-400" : "text-white/40"
                      }`}>{contact.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!newStoryMedia || isUploadingStory}
                className={`w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  !newStoryMedia || isUploadingStory
                    ? "bg-white/5 text-white/10 cursor-not-allowed"
                    : "bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-95"
                }`}
              >
                {isUploadingStory ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Radio className="w-4 h-4 animate-pulse" /> Live Now (+20 Karma)
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- POPUP MODAL SCREEN: ACTIVE CAMPUS STORY VIEWER (TikTok view) ----------------- */}
      {activeStory && (
        <div id="story-immersive-view" className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
          
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-white/10 bg-[#0A0F1E] flex flex-col justify-between min-h-[580px] shadow-2xl">
            
            {/* Top Bar info */}
            <div className="bg-[#151B2B] p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${activeStory.avatarBg} flex items-center justify-center font-bold text-xs text-white`}>
                  {activeStory.authorName[0]}
                </div>
                <div>
                  <p className="text-xs text-white font-bold leading-none">{activeStory.authorName}</p>
                  <p className="text-[8px] text-white/40 font-mono mt-0.5">{activeStory.authorHandle} • <strong className="text-emerald-400">{activeStory.uni}</strong></p>
                </div>
              </div>
              <button
                _id="btn-close-story"
                onClick={() => setActiveStory(null)}
                className="p-1 rounded-full bg-white/5 text-white/60 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Immersive Background Simulation content */}
            <div className="relative flex-1 bg-black overflow-hidden flex flex-col justify-end p-5 text-left">
              
              {/* Media backdrop */}
              <div className="absolute inset-0 flex items-center justify-center">
                {activeStory.mediaType === "video" ? (
                  <video 
                    src={activeStory.mediaUrl} 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  />
                ) : (
                  <img src={activeStory.mediaUrl} alt="Story visual data" className="w-full h-full object-cover filter brightness-[0.85]" />
                )}
                {/* Dark overlay for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </div>

              {/* FLOATING SOCIAL COMMENT STREAM overlay */}
              <div className="relative z-10 bottom-0 w-full space-y-4">
                
                {/* Visual statistics & Tags */}
                <div className="flex flex-wrap gap-2 text-[10px] font-semibold">
                  <span className="bg-emerald-500/80 text-white backdrop-blur-md px-2 py-0.5 rounded-full shadow-lg">
                    👀 {activeStory.views} Views
                  </span>
                  <span className="bg-rose-500/80 text-white backdrop-blur-md px-2 py-0.5 rounded-full shadow-lg">
                    ❤️ {activeStory.likes} Likes
                  </span>
                  <span className="bg-indigo-500/80 text-white backdrop-blur-md px-2 py-0.5 rounded-full shadow-lg">
                    🔁 {activeStory.shares} Reshares
                  </span>
                  {activeStory.tags && activeStory.tags.map(tag => (
                    <span key={tag} className="bg-indigo-500/80 text-white backdrop-blur-md px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> @{tag}
                    </span>
                  ))}
                  <span className="bg-white/20 text-white backdrop-blur-md px-2 py-0.5 rounded-full shadow-lg uppercase font-mono">
                    {activeStory.timestamp || "Moment"}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-white font-bold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {activeStory.caption}
                </p>

                {/* Sub scrolling comments list */}
                <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1 bg-black/40 p-2.5 rounded-xl border border-white/5 scrollbar-none">
                  {storyBubbleComments.map((commList, i) => (
                    <div key={i} className="text-[10px] text-white/80 leading-snug flex items-start gap-1">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{commList}</span>
                    </div>
                  ))}
                </div>

                {/* Submit quick bubble comment inside immersive modal */}
                <form onSubmit={handleAddStoryComment} className="flex gap-1 relative z-20">
                  <input
                    type="text"
                    required
                    placeholder="Bubble Comment... ('Wahala o!')"
                    value={newStoryComment}
                    onChange={(e) => setNewStoryComment(e.target.value)}
                    className="flex-1 bg-black/60 border border-white/20 text-xs text-white p-2 rounded-lg font-sans placeholder-white/30 focus:outline-none"
                  />
                  <button type="submit" className="bg-emerald-500 text-white font-bold p-2 px-3.5 rounded-lg text-xs cursor-pointer">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

              </div>

              {/* RIGHT VERTICAL BAR REACTION ACTIONS (TikTok style) */}
              <div className="absolute right-4 top-1/4 z-10 flex flex-col gap-4 text-center">
                <button
                  onClick={() => setStoryReactions(prev => ({ ...prev, fireOrder: (prev.fireOrder || 0) + 1 }))}
                  className="bg-black/60 p-2 border border-white/10 rounded-full text-white hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="text-lg block">🔥</span>
                  <span className="text-[9px] font-mono text-white/60 block leading-none mt-1">{storyReactions.fireOrder}</span>
                </button>

                <button
                  onClick={() => setStoryReactions(prev => ({ ...prev, laughOrder: (prev.laughOrder || 0) + 1 }))}
                  className="bg-black/60 p-2 border border-white/10 rounded-full text-white hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="text-lg block">😂</span>
                  <span className="text-[9px] font-mono text-white/60 block leading-none mt-1">{storyReactions.laughOrder}</span>
                </button>

                <button
                  onClick={() => setStoryReactions(prev => ({ ...prev, sweatOrder: (prev.sweatOrder || 0) + 1 }))}
                  className="bg-black/60 p-2 border border-white/10 rounded-full text-white hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="text-lg block">😭</span>
                  <span className="text-[9px] font-mono text-white/60 block leading-none mt-1">{storyReactions.sweatOrder}</span>
                </button>
              </div>

            </div>

            {/* Layout stabilization */}
            <div className="bg-[#151B2B] p-3 border-t border-white/15 text-center text-[10px] text-white/30">
              ⚡ Swipe down or click the [X] top button to return to feed.
            </div>

          </div>

        </div>
      )}

      {/* ----------------- FULL WIDTH BOTTOM: UNIVERSITY SECTOR SHIFTER ----------------- */}
      <div className="lg:col-span-12 mt-12 pb-20 relative z-10">
        <div className="bg-[#151B2B]/60 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <button 
            onClick={() => setIsUniListExpanded(!isUniListExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30 shadow-inner">
                <MapPin className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Switch Campus Sector</h3>
                <p className="text-xs text-white/40 font-mono">Current: <span className="text-emerald-400 font-bold">{universities.find(u => u.id === selectedUniId)?.name || 'Global Node'}</span></p>
              </div>
            </div>
            <div className={`p-2 rounded-full bg-white/5 transition-transform duration-500 ${isUniListExpanded ? 'rotate-180' : ''}`}>
              <TrendingUp className={`w-6 h-6 text-white/40 group-hover:text-white transition-colors rotate-90`} />
            </div>
          </button>

          {isUniListExpanded && (
            <div className="p-6 border-t border-white/5 bg-[#0A0F1E]/80 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {universities.map((uni) => {
                  const active = selectedUniId === uni.id;
                  return (
                    <button
                      key={uni.id}
                      onClick={() => {
                        setSelectedUniId(uni.id);
                        setSelectedHashtag(null);
                        setIsUniListExpanded(false); 
                        window.scrollTo({ top: 0, behavior: 'smooth' }); 
                      }}
                      className={`text-left p-4 rounded-2xl border text-xs transition-all flex items-center justify-between cursor-pointer group/item ${
                        active 
                          ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_25px_rgba(16,185,129,0.15)]" 
                          : "bg-[#151B2B] border-white/5 hover:border-indigo-500/30 text-white/60 hover:text-white hover:scale-[1.02] hover:shadow-xl"
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className={`w-2 h-2 rounded-full shadow-sm ${active ? "bg-emerald-400 animate-pulse" : "bg-white/10"}`}></span>
                        <div className="truncate">
                          <p className="font-bold truncate">{uni.name}</p>
                          <p className="text-[9px] text-white/30 truncate">{uni.location}</p>
                        </div>
                      </div>
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded shrink-0 ${active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/30'}`}>
                        {uni.abbreviation}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
