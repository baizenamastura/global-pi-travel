"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  ArrowLeft,
  Send,
  Users,
  Heart,
  Smile,
  Moon,
  Sparkles,
  Search,
  Edit,
  Flag,
  BookmarkPlus,
  Bookmark,
  Pin,
  ImageIcon,
  BarChart3,
  Award,
  User,
  MessageSquareIcon,
  Bold,
  Italic,
  Underline,
  Palette,
  Upload,
  Mail,
  MessageCircle,
  ThumbsUp,
  Share2,
  X,
  Type,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TravelForumProps {
  onBack: () => void
  currentUser?: {
    username: string
    role?: "user" | "merchant" | "admin"
  }
}

const quickMessages = [
  { icon: Moon, text: "Good Night", emoji: "🌙" },
  { icon: Heart, text: "Sending Love", emoji: "❤️" },
  { icon: Sparkles, text: "Sending Hugs", emoji: "🤗" },
  { icon: Smile, text: "Have a Great Day", emoji: "😊" },
]

const emojiReactions = ["👍", "❤️", "😊", "🎉", "🙏", "✈️", "🌟", "🔥", "😀", "😂", "🤔", "💪"]

const initialMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "SC",
    status: "online",
    badge: "Explorer",
    posts: 45,
    replies: 15,
    likes: 320,
    achievements: ["Top Contributor", "Frequent Traveler"],
    userStatus: "Exploring the world one city at a time!",
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    avatar: "MR",
    status: "online",
    badge: "Pioneer",
    posts: 67,
    replies: 30,
    likes: 540,
    achievements: ["Travel Guru", "Local Expert"],
    userStatus: "Food enthusiast exploring cuisines worldwide",
  },
  {
    id: 3,
    name: "Emma Watson",
    avatar: "EW",
    status: "offline",
    badge: "Traveler",
    posts: 23,
    replies: 10,
    likes: 180,
    achievements: ["Budget Traveler"],
    userStatus: "Seeking adventure and new experiences",
  },
  {
    id: 4,
    name: "James Park",
    avatar: "JP",
    status: "online",
    badge: "Legend",
    posts: 89,
    replies: 55,
    likes: 720,
    achievements: ["Community Leader", "Pioneer"],
    userStatus: "Sharing hidden gems and local insights",
  },
  {
    id: 5,
    name: "Lisa Kim",
    avatar: "LK",
    status: "online",
    badge: "Explorer",
    posts: 34,
    replies: 22,
    likes: 260,
    achievements: ["Photography Enthusiast"],
    userStatus: "Capturing moments from my travels",
  },
  {
    id: 6,
    name: "Tom Anderson",
    avatar: "TA",
    status: "offline",
    badge: "Traveler",
    posts: 12,
    replies: 5,
    likes: 95,
    achievements: [],
    userStatus: "Enjoying the journey, one destination at a time",
  },
  {
    id: 7,
    name: "Anna Martinez",
    avatar: "AM",
    status: "online",
    badge: "Pioneer",
    posts: 56,
    replies: 38,
    likes: 440,
    achievements: ["Top Reviewer"],
    userStatus: "Sharing practical travel tips and advice",
  },
  {
    id: 8,
    name: "David Lee",
    avatar: "DL",
    status: "online",
    badge: "Explorer",
    posts: 41,
    replies: 28,
    likes: 310,
    achievements: ["Adventure Seeker"],
    userStatus: "Always looking for the next thrill",
  },
]

const initialPosts = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "SC",
    title: "Best Pi-accepting restaurants in Tokyo?",
    content:
      "Planning a trip to Tokyo next month. Looking for recommendations for restaurants that accept Pi payment. Any suggestions?",
    category: "Restaurants",
    tags: ["Tokyo", "Japan", "Dining", "Pi Payment"],
    likes: 24,
    replies: [] as Array<{ author: string; content: string; timestamp: string; avatar: string }>,
    timestamp: "2 hours ago",
    reactions: { "👍": 10, "❤️": 8, "✈️": 6 },
    isPinned: false,
    image: "",
    hasPolls: false,
    pollData: null as any,
    isEdited: false,
  },
  {
    id: 2,
    author: "Mike Rodriguez",
    avatar: "MR",
    title: "Amazing experience at Pi Paradise Resort in Bali",
    content:
      "Just spent a week at this Pi-accepting resort in Bali. The service was incredible and paying with Pi was seamless. Highly recommend!",
    category: "Resorts",
    tags: ["Bali", "Resort", "Luxury", "Pi Payment"],
    likes: 45,
    replies: [] as Array<{ author: string; content: string; timestamp: string; avatar: string }>,
    timestamp: "5 hours ago",
    reactions: { "👍": 20, "🎉": 15, "🌟": 10 },
    isPinned: true,
    image: "",
    hasPolls: false,
    pollData: null as any,
    isEdited: false,
  },
  {
    id: 3,
    author: "Emma Watson",
    avatar: "EW",
    title: "Tips for booking flights with Pi",
    content:
      "Has anyone successfully booked international flights using Pi? Would love to hear about your experiences and any tips!",
    category: "Flights",
    tags: ["Flights", "Travel Tips", "Pi Payment"],
    likes: 31,
    replies: [] as Array<{ author: string; content: string; timestamp: string; avatar: string }>,
    timestamp: "1 day ago",
    reactions: { "👍": 15, "✈️": 16 },
    isPinned: false,
    image: "",
    hasPolls: false,
    pollData: null as any,
    isEdited: false,
  },
  {
    id: 4,
    author: "James Park",
    avatar: "JP",
    title: "Hidden gem cafes in Paris accepting Pi",
    content:
      "Found some amazing cafes in Paris that accept Pi. Perfect for digital nomads and crypto travelers. Let me know if you want the list!",
    category: "Cafes",
    tags: ["Paris", "Cafes", "Hidden Gems"],
    likes: 56,
    replies: [] as Array<{ author: string; content: string; timestamp: string; avatar: string }>,
    timestamp: "2 days ago",
    reactions: { "❤️": 25, "😊": 18, "🔥": 13 },
    isPinned: true,
    image: "",
    hasPolls: false,
    pollData: null as any,
    isEdited: false,
  },
]

const badgeColors: Record<string, string> = {
  Traveler: "bg-blue-500",
  Explorer: "bg-green-500",
  Pioneer: "bg-purple-500",
  Legend: "bg-yellow-500",
}

export function TravelForum({ onBack, currentUser }: TravelForumProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null)
  const [showMembers, setShowMembers] = useState(false)
  const [members, setMembers] = useState(initialMembers)
  const [posts, setPosts] = useState(initialPosts)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("Restaurants")
  const [showQuickMessages, setShowQuickMessages] = useState<number | null>(null)
  const [showReplyInput, setShowReplyInput] = useState<number | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "trending" | "mostReplies">("newest")
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([])
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)
  const [editingPostId, setEditingPostId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const [newPostTags, setNewPostTags] = useState<string[]>([])
  const [newTagInput, setNewTagInput] = useState("")
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [showPollOptions, setShowPollOptions] = useState(false)
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""])
  const [newPostImage, setNewPostImage] = useState("")

  const [textBold, setTextBold] = useState(false)
  const [textItalic, setTextItalic] = useState(false)
  const [textUnderline, setTextUnderline] = useState(false)
  const [textColor, setTextColor] = useState("#000000")
  const [fontSize, setFontSize] = useState("16px")
  const [fontFamily, setFontFamily] = useState("Arial")

  const [showMessages, setShowMessages] = useState(false)
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [messageText, setMessageText] = useState("")
  const [conversations, setConversations] = useState([
    {
      id: 1,
      memberId: 2,
      memberName: "Maria Garcia",
      avatar: "MG",
      lastMessage: "Thanks for the travel tips!",
      timestamp: "2 min ago",
      unread: 2,
      messages: [
        { sender: "Maria Garcia", text: "Hi! I saw your post about Paris", time: "10:30 AM" },
        { sender: "You", text: "Hello! Yes, happy to help!", time: "10:32 AM" },
        { sender: "Maria Garcia", text: "Thanks for the travel tips!", time: "10:35 AM" },
      ],
    },
    {
      id: 2,
      memberId: 3,
      memberName: "John Smith",
      avatar: "JS",
      lastMessage: "See you there!",
      timestamp: "1 hour ago",
      unread: 0,
      messages: [
        { sender: "John Smith", text: "Are you going to Tokyo next month?", time: "Yesterday" },
        { sender: "You", text: "Yes! Planning to visit in March", time: "Yesterday" },
        { sender: "John Smith", text: "See you there!", time: "Yesterday" },
      ],
    },
  ])

  const [userStatus, setUserStatus] = useState("Exploring the world one city at a time!")
  const [editingStatus, setEditingStatus] = useState(false)
  const [statusInput, setStatusInput] = useState("")

  const [mainPostContent, setMainPostContent] = useState("")
  const [showEmojiSelector, setShowEmojiSelector] = useState(false)

  const categories = ["all", "Restaurants", "Hotels", "Resorts", "Cafes", "Flights", "Tourist Spots"]

  useEffect(() => {
    if (currentUser && !members.find((m) => m.name === currentUser.username)) {
      setMembers((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: currentUser.username,
          avatar: currentUser.username.substring(0, 2).toUpperCase(),
          status: "online",
          badge: "Traveler",
          posts: 0,
          replies: 0,
          likes: 0,
          achievements: [],
          userStatus: "",
        },
      ])
    }
  }, [currentUser])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPosts = localStorage.getItem("globalTravelPi_posts")
      const savedBookmarks = localStorage.getItem("globalTravelPi_bookmarks")
      if (savedPosts) {
        try {
          setPosts(JSON.parse(savedPosts))
        } catch (e) {
          // Handle error silently
        }
      }
      if (savedBookmarks) {
        try {
          setBookmarkedPosts(JSON.parse(savedBookmarks))
        } catch (e) {
          // Handle error silently
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && posts.length > 0) {
      localStorage.setItem("globalTravelPi_posts", JSON.stringify(posts))
    }
  }, [posts])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("globalTravelPi_bookmarks", JSON.stringify(bookmarkedPosts))
    }
  }, [bookmarkedPosts])

  const handleInvite = () => {
    alert("Invite link copied! Share with your friends to join Global Pi Pioneers Community")
  }

  const handleEmojiReaction = (postId: number, emoji: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const currentCount = post.reactions[emoji] || 0
          return {
            ...post,
            reactions: {
              ...post.reactions,
              [emoji]: currentCount + 1,
            },
          }
        }
        return post
      }),
    )
    setShowEmojiPicker(null)
  }

  const handleQuickMessage = (postId: number, message: string) => {
    if (!currentUser) return

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                author: currentUser.username,
                content: message,
                timestamp: "Just now",
                avatar: currentUser.username.substring(0, 2).toUpperCase(),
              },
            ],
          }
        }
        return post
      }),
    )
    setShowQuickMessages(null)
  }

  const handleReply = (postId: number) => {
    if (!replyContent.trim() || !currentUser) return

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                author: currentUser.username,
                content: replyContent,
                timestamp: "Just now",
                avatar: currentUser.username.substring(0, 2).toUpperCase(),
              },
            ],
          }
        }
        return post
      }),
    )
    setReplyContent("")
    setReplyingTo(null)
  }

  // Function to apply text formatting
  const getTextStyle = () => {
    return {
      fontWeight: textBold ? "bold" : "normal",
      fontStyle: textItalic ? "italic" : "normal",
      textDecoration: textUnderline ? "underline" : "none",
      color: textColor,
      fontSize: fontSize,
      fontFamily: fontFamily,
    }
  }

  // Function to send private message
  const handleSendMessage = () => {
    if (!messageText.trim() || selectedChat === null) return

    setConversations(
      conversations.map((conv) => {
        if (conv.id === selectedChat) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              {
                sender: "You",
                text: messageText,
                time: "Just now",
              },
            ],
            lastMessage: messageText,
            timestamp: "Just now",
          }
        }
        return conv
      }),
    )
    setMessageText("")
  }

  // Function to update user status
  const handleUpdateStatus = () => {
    if (statusInput.trim()) {
      setUserStatus(statusInput)
      setEditingStatus(false)
      setStatusInput("")
    }
  }

  // Function to start chat with member
  const handleStartChat = (memberId: number, memberName: string, avatar: string) => {
    const existingConv = conversations.find((c) => c.memberId === memberId)
    if (existingConv) {
      setSelectedChat(existingConv.id)
      setShowMessages(true)
    } else {
      const newConv = {
        id: conversations.length + 1,
        memberId,
        memberName,
        avatar,
        lastMessage: "",
        timestamp: "Just now",
        unread: 0,
        messages: [],
      }
      setConversations([...conversations, newConv])
      setSelectedChat(newConv.id)
      setShowMessages(true)
    }
  }

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !currentUser) return

    const newPost = {
      id: posts.length + 1,
      author: currentUser.username,
      avatar: currentUser.username.substring(0, 2).toUpperCase(),
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      tags: newPostTags,
      likes: 0,
      replies: [],
      timestamp: "Just now",
      reactions: {},
      isPinned: false,
      image: newPostImage,
      hasPolls: showPollOptions && pollOptions.filter((o) => o.trim()).length >= 2,
      pollData: showPollOptions
        ? {
            options: pollOptions.filter((o) => o.trim()).map((opt) => ({ text: opt, votes: 0 })),
            totalVotes: 0,
          }
        : null,
      isEdited: false,
    }

    setPosts([newPost, ...posts])
    setNewPostTitle("")
    setNewPostContent("")
    setNewPostTags([])
    setNewPostImage("")
    setShowPollOptions(false)
    setPollOptions(["", ""])
    setShowNewPost(false)
  }

  const toggleBookmark = (postId: number) => {
    if (bookmarkedPosts.includes(postId)) {
      setBookmarkedPosts(bookmarkedPosts.filter((id) => id !== postId))
    } else {
      setBookmarkedPosts([...bookmarkedPosts, postId])
    }
  }

  const startEditPost = (post: any) => {
    setEditingPostId(post.id)
    setEditTitle(post.title)
    setEditContent(post.content)
  }

  const saveEditPost = () => {
    if (!editTitle.trim() || !editContent.trim()) return

    setPosts(
      posts.map((post) => {
        if (post.id === editingPostId) {
          return {
            ...post,
            title: editTitle,
            content: editContent,
            isEdited: true,
          }
        }
        return post
      }),
    )
    setEditingPostId(null)
    setEditTitle("")
    setEditContent("")
  }

  const reportPost = (postId: number) => {
    alert("Post reported. Our moderators will review it shortly. Thank you for keeping our community safe!")
  }

  const voteOnPoll = (postId: number, optionIndex: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId && post.pollData) {
          const newOptions = [...post.pollData.options]
          newOptions[optionIndex].votes += 1
          return {
            ...post,
            pollData: {
              ...post.pollData,
              options: newOptions,
              totalVotes: post.pollData.totalVotes + 1,
            },
          }
        }
        return post
      }),
    )
  }

  const filteredAndSortedPosts = posts
    .filter((post) => {
      // Category filter
      if (selectedCategory !== "all" && post.category !== selectedCategory) return false

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
        )
      }

      // Bookmarks filter
      if (showBookmarksOnly && !bookmarkedPosts.includes(post.id)) return false

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.likes - a.likes
        case "trending":
          return (
            Object.values(b.reactions).reduce((sum: number, val) => sum + val, 0) -
            Object.values(a.reactions).reduce((sum: number, val) => sum + val, 0)
          )
        case "mostReplies":
          return b.replies.length - a.replies.length
        default: // newest
          return 0 // Already sorted by timestamp in array
      }
    })
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)) // Pinned posts always on top

  const canPost = !!currentUser

  const getMemberProfile = (memberId: number) => {
    return members.find((m) => m.id === memberId)
  }

  const startConversation = (memberName: string, avatar: string) => {
    const memberId = members.find((m) => m.name === memberName)?.id
    if (memberId) {
      handleStartChat(memberId, memberName, avatar)
    }
  }

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newReactions = { ...post.reactions }
          const currentLikes = newReactions.likes || 0
          newReactions.likes = currentLikes + 1
          // Mark as liked by current user (simplified for demo)
          newReactions.hasLiked = true
          return { ...post, reactions: newReactions }
        }
        return post
      }),
    )
  }

  const toggleComments = (postId: number) => {
    // Implement logic to toggle comments visibility if needed
    console.log("Toggling comments for post:", postId)
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: "#F3E5F5" }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="shadow-md rounded-lg mb-6"
          style={{
            background: "linear-gradient(135deg, #4A148C 0%, #7B1FA2 50%, #9C27B0 100%)",
          }}
        >
          <div className="container mx-auto px-4 py-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 text-base"
              style={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">Global Pi Pioneers Community</h1>
            <p className="text-base text-white/90 mt-2 drop-shadow">
              Connect, Share, Explore - Travel the world with Pi
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              {currentUser && (
                <Badge
                  variant="secondary"
                  className="px-4 py-2 text-sm font-semibold"
                  style={{ backgroundColor: "#E1BEE7", color: "#1B5E20" }}
                >
                  <User className="h-4 w-4 mr-2" />
                  {currentUser.username}
                </Badge>
              )}
              <Button onClick={handleInvite} className="gap-2" style={{ backgroundColor: "#BA68C8", color: "white" }}>
                <Send className="h-4 w-4" />
                Invite Friends
              </Button>
              <Button
                onClick={() => setShowMembers(!showMembers)}
                className="gap-2"
                style={{ backgroundColor: "#9C27B0", color: "white" }}
              >
                <Users className="h-4 w-4" />
                {members.length} Members
              </Button>
              <Button
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                variant={showBookmarksOnly ? "default" : "outline"}
                className="gap-2"
                style={
                  showBookmarksOnly
                    ? { backgroundColor: "#7B1FA2", color: "white" }
                    : { borderColor: "white", color: "white", backgroundColor: "rgba(255,255,255,0.1)" }
                }
              >
                <Bookmark className="h-4 w-4" />
                My Bookmarks ({bookmarkedPosts.length})
              </Button>
              {!showNewPost && !showMembers && !showMessages && (
                <Button
                  onClick={() => setShowMessages(true)}
                  size="lg"
                  style={{ backgroundColor: "#4A148C", color: "white" }}
                  className="shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Messages{" "}
                  {conversations.reduce((sum, c) => sum + c.unread, 0) > 0 && (
                    <Badge className="ml-2" style={{ backgroundColor: "#FFD700", color: "#4A148C" }}>
                      {conversations.reduce((sum, c) => sum + c.unread, 0)}
                    </Badge>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Private Messages view */}
        {showMessages && (
          <Card className="mb-6 shadow-xl border-2" style={{ borderColor: "#4A148C", backgroundColor: "white" }}>
            <CardHeader style={{ backgroundColor: "#4A148C" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => {
                      setShowMessages(false)
                      setSelectedChat(null)
                    }}
                    size="sm"
                    variant="ghost"
                    style={{ color: "white" }}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div>
                    <CardTitle style={{ color: "white" }}>Private Messages</CardTitle>
                    <CardDescription style={{ color: "rgba(255,255,255,0.9)" }}>
                      Chat privately with community members
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex h-[600px]">
                {/* Conversations List */}
                <div className="w-1/3 border-r" style={{ borderColor: "#E0E0E0" }}>
                  <div className="p-4 space-y-2">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedChat(conv.id)}
                        className="p-3 rounded-lg cursor-pointer hover:shadow-md transition-all"
                        style={{
                          backgroundColor: selectedChat === conv.id ? "#E1BEE7" : "white",
                          borderWidth: "2px",
                          borderColor: selectedChat === conv.id ? "#4A148C" : "#E0E0E0",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback style={{ backgroundColor: "#4A148C", color: "white" }}>
                              {conv.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-sm truncate" style={{ color: "#2C3E50" }}>
                                {conv.memberName}
                              </p>
                              {conv.unread > 0 && (
                                <Badge style={{ backgroundColor: "#FFD700", color: "#4A148C" }} className="text-xs">
                                  {conv.unread}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs truncate" style={{ color: "#7F8C8D" }}>
                              {conv.lastMessage || "Start a conversation"}
                            </p>
                            <p className="text-xs mt-1" style={{ color: "#95A5A6" }}>
                              {conv.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                  {selectedChat ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b" style={{ borderColor: "#E0E0E0", backgroundColor: "#F3E5F5" }}>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback style={{ backgroundColor: "#4A148C", color: "white" }}>
                              {conversations.find((c) => c.id === selectedChat)?.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold" style={{ color: "#2C3E50" }}>
                              {conversations.find((c) => c.id === selectedChat)?.memberName}
                            </p>
                            <p className="text-xs" style={{ color: "#1B5E20" }}>
                              Online
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundColor: "#F3E5F5" }}>
                        {conversations
                          .find((c) => c.id === selectedChat)
                          ?.messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                              <div
                                className="max-w-[70%] rounded-lg p-3"
                                style={{
                                  backgroundColor: msg.sender === "You" ? "#4A148C" : "white",
                                  color: msg.sender === "You" ? "white" : "#2C3E50",
                                  border: msg.sender === "You" ? "none" : "2px solid #E0E0E0",
                                }}
                              >
                                <p className="text-sm">{msg.text}</p>
                                <p
                                  className="text-xs mt-1"
                                  style={{
                                    color: msg.sender === "You" ? "rgba(255,255,255,0.8)" : "#95A5A6",
                                  }}
                                >
                                  {msg.time}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t" style={{ borderColor: "#E0E0E0", backgroundColor: "white" }}>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type your message..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            className="flex-1"
                          />
                          <Button onClick={handleSendMessage} style={{ backgroundColor: "#4A148C", color: "white" }}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#F3E5F5" }}>
                      <div className="text-center">
                        <MessageCircle className="h-16 w-16 mx-auto mb-4" style={{ color: "#7B1FA2" }} />
                        <p className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                          Select a conversation
                        </p>
                        <p style={{ color: "#7F8C8D" }}>Choose a member to start chatting</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!currentUser && (
          <Card className="mb-6 border-2 shadow-lg" style={{ backgroundColor: "#E1BEE7", borderColor: "#BA68C8" }}>
            <CardContent className="pt-3 pb-3">
              <p className="text-center text-sm font-semibold" style={{ color: "#4A148C" }}>
                Please login with your Pi username to post, comment, react, and unlock all community features
              </p>
            </CardContent>
          </Card>
        )}

        {showMembers && (
          <Card className="mb-6 shadow-lg" style={{ backgroundColor: "white" }}>
            <CardHeader style={{ backgroundColor: "#7B1FA2", color: "white" }}>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="h-5 w-5" />
                Community Members
              </CardTitle>
              <CardDescription style={{ color: "rgba(255,255,255,0.9)" }} className="text-base">
                {members.filter((m) => m.status === "online").length} members online
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {/* current user status display */}
              {currentUser && (
                <div
                  className="mb-6 p-4 rounded-lg border-2"
                  style={{ backgroundColor: "#F3E5F5", borderColor: "#9C27B0" }}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback style={{ backgroundColor: "#7B1FA2", color: "white" }}>
                        {currentUser.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-bold mb-1" style={{ color: "#2C3E50" }}>
                        {currentUser.username}
                      </p>
                      {!editingStatus ? (
                        <div className="flex items-center justify-between">
                          <p className="text-sm italic" style={{ color: "#555" }}>
                            {userStatus}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingStatus(true)
                              setStatusInput(userStatus)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Input
                            placeholder="What's on your mind?"
                            value={statusInput}
                            onChange={(e) => setStatusInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleUpdateStatus()}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={handleUpdateStatus}
                              style={{ backgroundColor: "#7B1FA2", color: "white" }}
                            >
                              Update
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingStatus(false)}
                              style={{ borderColor: "#9C27B0", color: "#9C27B0" }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                    className="p-4 rounded-lg border-2 hover:shadow-md cursor-pointer transition-all"
                    style={{
                      backgroundColor: selectedMember === member.id ? "#F3E5F5" : "white",
                      borderColor: selectedMember === member.id ? "#7B1FA2" : "#E0E0E0",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar
                          className="h-12 w-12"
                          style={{ backgroundColor: "#4A148C", borderWidth: "2px", borderColor: "#FFD700" }}
                        >
                          <AvatarFallback style={{ backgroundColor: "#4A148C", color: "#FFD700", fontSize: "16px" }}>
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                            member.status === "online" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: "#2C3E50" }}>
                          {member.name}
                        </p>
                        <Badge
                          className={`text-xs mt-1 ${badgeColors[member.badge]} text-white`}
                          style={{ fontSize: "11px" }}
                        >
                          <Award className="h-3 w-3 mr-1" />
                          {member.badge}
                        </Badge>
                        <p className="text-xs mt-2 italic" style={{ color: "#7F8C8D" }}>
                          "{member.userStatus}"
                        </p>
                      </div>
                    </div>

                    {selectedMember === member.id && (
                      <div className="mt-4 pt-4 border-t space-y-3" style={{ borderColor: "#E0E0E0" }}>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 rounded" style={{ backgroundColor: "#F3E5F5" }}>
                            <p className="text-lg font-bold" style={{ color: "#4A148C" }}>
                              {member.posts}
                            </p>
                            <p className="text-xs" style={{ color: "#7F8C8D" }}>
                              Posts
                            </p>
                          </div>
                          <div className="p-2 rounded" style={{ backgroundColor: "#F3E5F5" }}>
                            <p className="text-lg font-bold" style={{ color: "#4A148C" }}>
                              {member.replies}
                            </p>
                            <p className="text-xs" style={{ color: "#7F8C8D" }}>
                              Replies
                            </p>
                          </div>
                          <div className="p-2 rounded" style={{ backgroundColor: "#F3E5F5" }}>
                            <p className="text-lg font-bold" style={{ color: "#4A148C" }}>
                              {member.likes}
                            </p>
                            <p className="text-xs" style={{ color: "#7F8C8D" }}>
                              Likes
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-semibold mb-2" style={{ color: "#2C3E50" }}>
                            Achievements
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {member.achievements.map((achievement, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                                style={{ borderColor: "#9C27B0", color: "#4A148C" }}
                              >
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {currentUser && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              startConversation(member.name, member.avatar)
                            }}
                            className="w-full"
                            style={{ backgroundColor: "#4A148C", color: "white" }}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Send Message
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Post Modal - Enhanced Facebook-style */}
        {showNewPost && (
          <Card className="border-2 shadow-2xl" style={{ borderColor: "#8E44AD", backgroundColor: "white" }}>
            <CardHeader style={{ backgroundColor: "#4A148C", color: "white" }}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Create Post</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowNewPost(false)
                    setNewPostTitle("")
                    setNewPostContent("")
                    setNewPostTags([])
                    setNewPostImage("")
                    setShowPollOptions(false)
                  }}
                  style={{ color: "white" }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {/* User Info */}
              <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: "#E0E0E0" }}>
                <Avatar className="h-10 w-10" style={{ backgroundColor: "#4A148C" }}>
                  <AvatarFallback style={{ backgroundColor: "#4A148C", color: "#FFD93D" }}>
                    {currentUser?.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-base" style={{ color: "#2C3E50" }}>
                    {currentUser?.username}
                  </p>
                  <p className="text-sm" style={{ color: "#7F8C8D" }}>
                    Posting to Community
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: "#2C3E50" }}>
                  Post Title
                </label>
                <Input
                  placeholder="Give your post a catchy title..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="text-base border-2"
                  style={{ borderColor: "#E0E0E0" }}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: "#2C3E50" }}>
                  Content
                </label>

                <div
                  className="p-3 rounded-t-lg border-2 border-b-0 flex flex-wrap gap-2 items-center"
                  style={{ backgroundColor: "#F3E5F5", borderColor: "#8E44AD" }}
                >
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      size="sm"
                      variant={textBold ? "default" : "outline"}
                      onClick={() => setTextBold(!textBold)}
                      style={textBold ? { backgroundColor: "#7B1FA2", color: "white" } : { borderColor: "#8E44AD" }}
                      className="font-bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={textItalic ? "default" : "outline"}
                      onClick={() => setTextItalic(!textItalic)}
                      style={textItalic ? { backgroundColor: "#7B1FA2", color: "white" } : { borderColor: "#8E44AD" }}
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={textUnderline ? "default" : "outline"}
                      onClick={() => setTextUnderline(!textUnderline)}
                      style={
                        textUnderline ? { backgroundColor: "#7B1FA2", color: "white" } : { borderColor: "#8E44AD" }
                      }
                    >
                      <Underline className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="h-6 w-px" style={{ backgroundColor: "#8E44AD" }} />

                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" style={{ color: "#7B1FA2" }} />
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger className="w-28 h-9 border-2" style={{ borderColor: "#8E44AD" }}>
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12px">Small (12px)</SelectItem>
                        <SelectItem value="16px">Normal (16px)</SelectItem>
                        <SelectItem value="20px">Large (20px)</SelectItem>
                        <SelectItem value="24px">X-Large (24px)</SelectItem>
                        <SelectItem value="28px">XX-Large (28px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger className="w-36 h-9 border-2" style={{ borderColor: "#8E44AD" }}>
                      <SelectValue placeholder="Font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arial" style={{ fontFamily: "Arial" }}>
                        Arial
                      </SelectItem>
                      <SelectItem value="Georgia" style={{ fontFamily: "Georgia" }}>
                        Georgia
                      </SelectItem>
                      <SelectItem value="Times New Roman" style={{ fontFamily: "Times New Roman" }}>
                        Times New Roman
                      </SelectItem>
                      <SelectItem value="Courier New" style={{ fontFamily: "Courier New" }}>
                        Courier New
                      </SelectItem>
                      <SelectItem value="Verdana" style={{ fontFamily: "Verdana" }}>
                        Verdana
                      </SelectItem>
                      <SelectItem value="Comic Sans MS" style={{ fontFamily: "Comic Sans MS" }}>
                        Comic Sans MS
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="h-6 w-px" style={{ backgroundColor: "#8E44AD" }} />

                  <div
                    className="flex items-center gap-2 border-2 rounded px-2 py-1"
                    style={{ borderColor: "#8E44AD" }}
                  >
                    <Palette className="h-4 w-4" style={{ color: "#7B1FA2" }} />
                    <span className="text-xs font-semibold" style={{ color: "#7B1FA2" }}>
                      Color:
                    </span>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-12 h-7 rounded cursor-pointer border"
                      style={{ borderColor: "#8E44AD" }}
                    />
                  </div>

                  <div className="h-6 w-px" style={{ backgroundColor: "#8E44AD" }} />

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="gap-2 bg-transparent"
                    style={{ borderColor: "#8E44AD", color: "#27AE60" }}
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Image
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="gap-2 bg-transparent"
                    style={{ borderColor: "#8E44AD", color: "#F39C12" }}
                    onClick={() => setShowEmojiSelector(!showEmojiSelector)}
                  >
                    <Smile className="h-4 w-4" />
                    Emoji
                  </Button>
                </div>

                {showEmojiSelector && (
                  <div
                    className="p-4 border-2 border-t-0 border-b-0 flex flex-wrap gap-2"
                    style={{ backgroundColor: "#FAFAFA", borderColor: "#8E44AD" }}
                  >
                    {emojiReactions.map((emoji) => (
                      <button
                        key={emoji}
                        className="text-2xl hover:scale-125 transition-transform p-2 rounded hover:bg-purple-50"
                        onClick={() => {
                          setNewPostContent(newPostContent + emoji)
                          setShowEmojiSelector(false)
                        }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                <Textarea
                  placeholder="What's on your mind? Share your travel experiences, tips, recommendations, or ask questions..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={6}
                  className="text-base border-2 rounded-t-none"
                  style={{
                    borderColor: "#8E44AD",
                    ...getTextStyle(),
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#2C3E50" }}>
                  <ImageIcon className="h-4 w-4" style={{ color: "#27AE60" }} />
                  Add Image or Photo
                </label>
                <Input
                  id="image-upload"
                  placeholder="Paste image URL or upload from device"
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                  className="text-base border-2"
                  style={{ borderColor: "#8E44AD" }}
                />
                {newPostImage && (
                  <div className="mt-3 relative">
                    <img
                      src={newPostImage || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full rounded-lg border-2"
                      style={{ borderColor: "#8E44AD", maxHeight: "300px", objectFit: "cover" }}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setNewPostImage("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: "#2C3E50" }}>
                  Tags (Help others find your post)
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {newPostTags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      style={{ backgroundColor: "#7B1FA2", color: "white" }}
                      className="cursor-pointer"
                      onClick={() => setNewPostTags(newPostTags.filter((_, i) => i !== idx))}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., Paris, Food, Budget)"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && newTagInput.trim()) {
                        setNewPostTags([...newPostTags, newTagInput.trim()])
                        setNewTagInput("")
                      }
                    }}
                    className="text-base border-2"
                    style={{ borderColor: "#E0E0E0" }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newTagInput.trim()) {
                        setNewPostTags([...newPostTags, newTagInput.trim()])
                        setNewTagInput("")
                      }
                    }}
                    style={{ backgroundColor: "#7B1FA2", color: "white" }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPollOptions(!showPollOptions)}
                  className="w-full border-2"
                  style={{ borderColor: "#E0E0E0", color: "#2C3E50" }}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {showPollOptions ? "Remove Poll" : "Add Poll"}
                </Button>

                {showPollOptions && (
                  <div className="mt-3 space-y-2 p-3 rounded-lg" style={{ backgroundColor: "#F3E5F5" }}>
                    <p className="text-sm font-semibold" style={{ color: "#2C3E50" }}>
                      Poll Options (min 2)
                    </p>
                    {pollOptions.map((opt, idx) => (
                      <Input
                        key={idx}
                        placeholder={`Option ${idx + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...pollOptions]
                          newOpts[idx] = e.target.value
                          setPollOptions(newOpts)
                        }}
                        className="text-base"
                      />
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setPollOptions([...pollOptions, ""])}
                      style={{ backgroundColor: "#9C27B0", color: "white" }}
                    >
                      Add Option
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: "#2C3E50" }}>
                  Category
                </label>
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="w-full p-3 border-2 rounded-md text-base"
                  style={{ borderColor: "#E0E0E0", color: "#2C3E50" }}
                >
                  {categories
                    .filter((c) => c !== "all")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleCreatePost}
                  className="flex-1"
                  size="lg"
                  style={{ backgroundColor: "#4A148C", color: "white" }}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post to Community
                </Button>
                <Button
                  onClick={() => {
                    setShowNewPost(false)
                    setNewPostTitle("")
                    setNewPostContent("")
                    setNewPostTags([])
                    setNewPostImage("")
                    setShowPollOptions(false)
                  }}
                  variant="outline"
                  size="lg"
                  className="border-2"
                  style={{ borderColor: "#E74C3C", color: "#E74C3C" }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-6 space-y-4">
          {canPost && (
            <Card className="border-2" style={{ borderColor: "#8E44AD", backgroundColor: "white" }}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10" style={{ backgroundColor: "#4A148C" }}>
                    <AvatarFallback style={{ backgroundColor: "#4A148C", color: "#FFD93D" }}>
                      {currentUser?.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    className="flex-1 justify-start text-left h-12 text-base bg-transparent"
                    onClick={() => setShowNewPost(true)}
                    style={{
                      backgroundColor: "#F8F9FA",
                      borderColor: "#E0E0E0",
                      color: "#7F8C8D",
                    }}
                  >
                    What's on your mind, {currentUser?.username}?
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-2 pt-3 border-t" style={{ borderColor: "#E0E0E0" }}>
                  <Button
                    variant="ghost"
                    className="flex-1 gap-2 text-base font-semibold hover:bg-purple-50"
                    onClick={() => setShowNewPost(true)}
                    style={{ color: "#7B1FA2" }}
                  >
                    <ImageIcon className="h-5 w-5" style={{ color: "#27AE60" }} />
                    Photo/Video
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 gap-2 text-base font-semibold hover:bg-purple-50"
                    onClick={() => {
                      setShowNewPost(true)
                      setShowPollOptions(true)
                    }}
                    style={{ color: "#7B1FA2" }}
                  >
                    <BarChart3 className="h-5 w-5" style={{ color: "#E67E22" }} />
                    Poll
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 gap-2 text-base font-semibold hover:bg-purple-50"
                    onClick={() => setShowNewPost(true)}
                    style={{ color: "#7B1FA2" }}
                  >
                    <Smile className="h-5 w-5" style={{ color: "#F39C12" }} />
                    Feeling
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search, Sort, and Filter Options */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                style={{ color: "#7F8C8D" }}
              />
              <Input
                placeholder="Search posts by title, content, author, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-base border-2 py-6"
                style={{ borderColor: "#E0E0E0", paddingLeft: "40px" }}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 border-2 rounded-md text-base font-semibold min-w-[180px]"
              style={{ borderColor: "#E0E0E0", color: "#2C3E50" }}
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
              <option value="mostReplies">Most Replies</option>
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="text-base font-semibold px-4 py-2"
              style={
                selectedCategory === cat
                  ? { backgroundColor: "#8E44AD", color: "white" }
                  : { borderColor: "#8E44AD", color: "#8E44AD" }
              }
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>

        <div className="space-y-5">
          {filteredAndSortedPosts.length === 0 ? (
            <Card className="p-8 text-center" style={{ backgroundColor: "white" }}>
              <p className="text-lg" style={{ color: "#7F8C8D" }}>
                No posts found. {showBookmarksOnly ? "You haven't bookmarked any posts yet." : "Be the first to post!"}
              </p>
            </Card>
          ) : (
            filteredAndSortedPosts.map((post) => (
              <Card
                key={post.id}
                className="shadow-lg hover:shadow-xl transition-shadow border-2 mb-6"
                style={{
                  borderColor: "#E1BEE7",
                  backgroundColor: "white",
                }}
              >
                {post.isPinned && (
                  <div
                    className="px-4 py-2 flex items-center gap-2 font-semibold text-sm rounded-t-lg"
                    style={{ backgroundColor: "#FFD700", color: "#4A148C" }}
                  >
                    <Pin className="h-4 w-4" />
                    Pinned Post
                  </div>
                )}

                <CardHeader>
                  {editingPostId === post.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="text-base font-semibold border-2"
                        style={{ borderColor: "#E0E0E0" }}
                      />
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={4}
                        className="text-base border-2"
                        style={{ borderColor: "#E0E0E0" }}
                      />
                      <div className="flex gap-2">
                        <Button onClick={saveEditPost} size="sm" style={{ backgroundColor: "#4A148C", color: "white" }}>
                          Save
                        </Button>
                        <Button
                          onClick={() => setEditingPostId(null)}
                          size="sm"
                          variant="outline"
                          style={{ borderColor: "#9C27B0", color: "#9C27B0" }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <Avatar style={{ backgroundColor: "#4A148C", borderWidth: "2px", borderColor: "#FFD700" }}>
                        <AvatarFallback style={{ backgroundColor: "#4A148C", color: "#FFD700" }}>
                          {post.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg md:text-xl" style={{ color: "#2C3E50" }}>
                              {post.title} {post.isEdited && <span className="text-sm text-gray-500">(edited)</span>}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm mt-1" style={{ color: "#7F8C8D" }}>
                              <span className="font-semibold" style={{ color: "#34495E" }}>
                                {post.author}
                              </span>
                              <span>•</span>
                              <span>{post.timestamp}</span>
                              <Badge
                                variant="outline"
                                className="ml-2 text-sm"
                                style={{ borderColor: "#7B1FA2", color: "#7B1FA2" }}
                              >
                                {post.category}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleBookmark(post.id)}
                              style={{ color: bookmarkedPosts.includes(post.id) ? "#FFD700" : "#7F8C8D" }}
                            >
                              {bookmarkedPosts.includes(post.id) ? (
                                <Bookmark className="h-4 w-4 fill-current" />
                              ) : (
                                <BookmarkPlus className="h-4 w-4" />
                              )}
                            </Button>
                            {currentUser && currentUser.username === post.author && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => startEditPost(post)}
                                style={{ color: "#7B1FA2" }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => reportPost(post.id)}
                              style={{ color: "#E74C3C" }}
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {post.tags.map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                              style={{ backgroundColor: "#F3E5F5", color: "#1B5E20" }}
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {editingPostId !== post.id && (
                    <>
                      <CardDescription className="text-base mb-3" style={{ color: "#34495E" }}>
                        {post.content}
                      </CardDescription>

                      {post.image && (
                        <div className="mb-4 rounded-lg overflow-hidden border-2" style={{ borderColor: "#E0E0E0" }}>
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post image"
                            className="w-full max-h-96 object-cover"
                          />
                        </div>
                      )}

                      {post.hasPolls && post.pollData && (
                        <div
                          className="mb-4 p-4 rounded-lg border-2"
                          style={{ backgroundColor: "#F8F9FA", borderColor: "#E0E0E0" }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <BarChart3 className="h-5 w-5" style={{ color: "#8E44AD" }} />
                            <p className="font-semibold" style={{ color: "#2C3E50" }}>
                              Community Poll ({post.pollData.totalVotes} votes)
                            </p>
                          </div>
                          <div className="space-y-2">
                            {post.pollData.options.map((option: any, idx: number) => {
                              const percentage =
                                post.pollData.totalVotes > 0
                                  ? Math.round((option.votes / post.pollData.totalVotes) * 100)
                                  : 0
                              return (
                                <button
                                  key={idx}
                                  onClick={() => canPost && voteOnPoll(post.id, idx)}
                                  disabled={!canPost}
                                  className="w-full text-left p-3 rounded-md border-2 hover:border-purple-500 transition-all relative overflow-hidden disabled:cursor-not-allowed"
                                  style={{ borderColor: "#E0E0E0", backgroundColor: "white" }}
                                >
                                  <div
                                    className="absolute inset-0 transition-all"
                                    style={{
                                      width: `${percentage}%`,
                                      backgroundColor: "rgba(142, 68, 173, 0.1)",
                                    }}
                                  />
                                  <div className="relative flex justify-between items-center">
                                    <span className="font-medium" style={{ color: "#2C3E50" }}>
                                      {option.text}
                                    </span>
                                    <span className="font-bold" style={{ color: "#8E44AD" }}>
                                      {percentage}% ({option.votes})
                                    </span>
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        <div className="relative">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowEmojiPicker(showEmojiPicker === post.id ? null : post.id)}
                            className="text-base font-semibold"
                            disabled={!canPost}
                            style={{ borderColor: "#E0E0E0", color: "#2C3E50" }}
                          >
                            <Smile className="mr-2 h-4 w-4" />
                            React
                          </Button>
                          {showEmojiPicker === post.id && (
                            <div
                              className="absolute bottom-full left-0 mb-2 border-2 rounded-lg shadow-2xl p-3 flex gap-2 z-10"
                              style={{ backgroundColor: "white", borderColor: "#E0E0E0" }}
                            >
                              {emojiReactions.map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => {
                                    handleEmojiReaction(post.id, emoji)
                                    setShowEmojiPicker(null)
                                  }}
                                  className="text-2xl hover:scale-125 transition-transform p-1"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="relative">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowQuickMessages(showQuickMessages === post.id ? null : post.id)}
                            className="text-base font-semibold"
                            disabled={!canPost}
                            style={{ borderColor: "#E0E0E0", color: "#2C3E50" }}
                          >
                            <Sparkles className="mr-2 h-4 w-4" />
                            Quick Message
                          </Button>
                          {showQuickMessages === post.id && (
                            <div
                              className="absolute bottom-full left-0 mb-2 border-2 rounded-lg shadow-2xl p-2 space-y-1 z-10 min-w-[200px]"
                              style={{ backgroundColor: "white", borderColor: "#E0E0E0" }}
                            >
                              {quickMessages.map((msg) => (
                                <button
                                  key={msg.text}
                                  onClick={() => {
                                    handleQuickMessage(post.id, `${msg.emoji} ${msg.text}`)
                                    setShowQuickMessages(null)
                                  }}
                                  className="w-full text-left px-3 py-2 rounded flex items-center gap-2 text-sm font-medium hover:bg-purple-50"
                                  style={{ color: "#2C3E50" }}
                                >
                                  <span className="text-lg">{msg.emoji}</span>
                                  <span>{msg.text}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowReplyInput(showReplyInput === post.id ? null : post.id)}
                          className="text-base font-semibold"
                          disabled={!canPost}
                          style={{ borderColor: "#E0E0E0", color: "#2C3E50" }}
                        >
                          <MessageSquareIcon className="mr-2 h-4 w-4" />
                          Reply ({post.replies.length})
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-base font-semibold bg-transparent"
                          style={{ borderColor: "#E0E0E0", color: "#E74C3C" }}
                        >
                          <Heart className="mr-1 h-4 w-4 fill-current" />
                          {post.likes}
                        </Button>
                      </div>

                      {/* Show Emoji Reactions */}
                      {Object.keys(post.reactions).length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {Object.entries(post.reactions).map(([emoji, count]) => (
                            <Button
                              key={emoji}
                              variant="outline"
                              size="sm"
                              className="gap-1 h-9 px-3 hover:scale-105 transition-transform bg-transparent"
                              onClick={() => canPost && handleEmojiReaction(post.id, emoji)}
                              disabled={!canPost}
                              style={{
                                backgroundColor: "#F8F9FA",
                                borderColor: "#E0E0E0",
                                color: "#2C3E50",
                              }}
                            >
                              <span className="text-lg">{emoji}</span>
                              <span className="text-sm font-bold">{count}</span>
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* Reply Input */}
                      {showReplyInput === post.id && (
                        <div
                          className="mt-4 p-4 rounded-lg border-2"
                          style={{ backgroundColor: "#F8F9FA", borderColor: "#E0E0E0" }}
                        >
                          <Textarea
                            placeholder="Write your reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            rows={3}
                            className="mb-3 text-base border-2"
                            style={{ borderColor: "#E0E0E0", backgroundColor: "white" }}
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleReply(post.id)}
                              size="sm"
                              className="font-semibold"
                              style={{ backgroundColor: "#27AE60", color: "white" }}
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Send Reply
                            </Button>
                            <Button
                              onClick={() => {
                                setShowReplyInput(null)
                                setReplyContent("")
                              }}
                              size="sm"
                              variant="outline"
                              style={{ borderColor: "#E74C3C", color: "#E74C3C" }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Replies Section */}
                      {post.replies.length > 0 && (
                        <div className="mt-4 space-y-3 border-l-4 pl-4" style={{ borderColor: "#8E44AD" }}>
                          <p className="text-sm font-bold" style={{ color: "#8E44AD" }}>
                            {post.replies.length} {post.replies.length === 1 ? "Reply" : "Replies"}
                          </p>
                          {post.replies.map((reply, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-lg border"
                              style={{ backgroundColor: "#FAFAFA", borderColor: "#E0E0E0" }}
                            >
                              <div className="flex items-start gap-2 mb-2">
                                <Avatar className="h-8 w-8" style={{ backgroundColor: "#5C4DB1" }}>
                                  <AvatarFallback
                                    style={{ backgroundColor: "#5C4DB1", color: "#FFD93D", fontSize: "12px" }}
                                  >
                                    {reply.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold" style={{ color: "#2C3E50" }}>
                                      {reply.author}
                                    </span>
                                    <span className="text-xs" style={{ color: "#7F8C8D" }}>
                                      {reply.timestamp}
                                    </span>
                                  </div>
                                  <p className="text-sm mt-1" style={{ color: "#34495E" }}>
                                    {reply.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    style={{
                      backgroundColor: post.reactions.hasLiked ? "#F3E5F5" : "white",
                      borderColor: post.reactions.hasLiked ? "#7B1FA2" : "#E0E0E0",
                      color: post.reactions.hasLiked ? "#4A148C" : "#7F8C8D",
                    }}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleComments(post.id)}
                    style={{ borderColor: "#E0E0E0", color: "#7F8C8D" }}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.replies.length} Replies
                  </Button>
                  <Button variant="outline" size="sm" style={{ borderColor: "#E0E0E0", color: "#7F8C8D" }}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
