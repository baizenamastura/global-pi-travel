"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Video,
  Upload,
  Share2,
  Users,
  Gift,
  Facebook,
  Twitter,
  MessageCircle,
  Send,
  Copy,
  CheckCircle2,
  Trash2,
  Eye,
  TrendingUp,
} from "lucide-react"
import { analytics } from "@/lib/analytics"

interface VideoInvitationHubProps {
  user: {
    uid: string
    username: string
  }
}

interface VideoMetadata {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  uploadedAt: string
  views: number
  shares: number
  referralsGenerated: number
  type: "merchant" | "user"
}

export function VideoInvitationHub({ user }: VideoInvitationHubProps) {
  const [videos, setVideos] = useState<VideoMetadata[]>(() => {
    if (!user) return []
    const stored = localStorage.getItem(`videos_${user.uid}`)
    return stored ? JSON.parse(stored) : []
  })

  const [uploadingVideo, setUploadingVideo] = useState<File | null>(null)
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [videoType, setVideoType] = useState<"merchant" | "user">("merchant")
  const [copied, setCopied] = useState(false)

  const referralCode =
    user.username.substring(0, 4).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase()
  const baseShareUrl = `https://globalpitravel.com/join?ref=${referralCode}`

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert("Video file must be less than 100MB")
        return
      }
      setUploadingVideo(file)
    }
  }

  const handleSubmitVideo = () => {
    if (!uploadingVideo || !videoTitle) {
      alert("Please provide a video and title")
      return
    }

    const newVideo: VideoMetadata = {
      id: Date.now().toString(),
      title: videoTitle,
      description: videoDescription,
      videoUrl: URL.createObjectURL(uploadingVideo),
      thumbnailUrl: "/placeholder.jpg",
      uploadedAt: new Date().toLocaleDateString(),
      views: 0,
      shares: 0,
      referralsGenerated: 0,
      type: videoType,
    }

    const updatedVideos = [...videos, newVideo]
    setVideos(updatedVideos)
    localStorage.setItem(`videos_${user.uid}`, JSON.stringify(updatedVideos))

    analytics.trackEvent("video", "upload", `${user.username}_${videoType}`)

    setUploadingVideo(null)
    setVideoTitle("")
    setVideoDescription("")
    alert("Video uploaded successfully! You can now share it with your referral link.")
  }

  const handleShareToSocial = (platform: string, videoId: string) => {
    const video = videos.find((v) => v.id === videoId)
    if (!video) return

    const shareUrl = `${baseShareUrl}&video=${videoId}`
    const shareText = `Check out this amazing opportunity with Global Pi Travel! ${video.title}`

    let url = ""
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        break
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`
        break
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
        break
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400")

      const updatedVideos = videos.map((v) => (v.id === videoId ? { ...v, shares: v.shares + 1 } : v))
      setVideos(updatedVideos)
      localStorage.setItem(`videos_${user.uid}`, JSON.stringify(updatedVideos))

      analytics.trackEvent("share", platform, `video_${videoId}`)
    }
  }

  const handleCopyShareLink = (videoId: string) => {
    const shareUrl = `${baseShareUrl}&video=${videoId}`
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    analytics.trackEvent("copy", "share_link", `video_${videoId}`)
  }

  const handleDeleteVideo = (videoId: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      const updatedVideos = videos.filter((v) => v.id !== videoId)
      setVideos(updatedVideos)
      localStorage.setItem(`videos_${user.uid}`, JSON.stringify(updatedVideos))

      analytics.trackEvent("video", "delete", videoId)
    }
  }

  const merchantVideos = videos.filter((v) => v.type === "merchant")
  const userVideos = videos.filter((v) => v.type === "user")
  const totalReferrals = videos.reduce((sum, v) => sum + v.referralsGenerated, 0)
  const totalShares = videos.reduce((sum, v) => sum + v.shares, 0)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold opacity-90">Total Referrals</p>
                <p className="text-4xl font-bold">{totalReferrals}</p>
              </div>
              <Users className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold opacity-90">Total Shares</p>
                <p className="text-4xl font-bold">{totalShares}</p>
              </div>
              <Share2 className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold opacity-90">Videos Uploaded</p>
                <p className="text-4xl font-bold">{videos.length}</p>
              </div>
              <Video className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Banner */}
      <Card className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 border-4 border-yellow-500">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Gift className="h-16 w-16 text-white flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Earn Rewards for Every Referral!</h3>
              <p className="text-white text-lg font-semibold">
                Get $2 credit when someone registers through your video link + 5% commission on their first Pro upgrade!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload New Video */}
      <Card className="border-2 border-primary">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Invitation Video
          </CardTitle>
          <CardDescription>
            Create engaging videos to invite merchants or users to join Global Pi Travel
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>Video Type</Label>
            <div className="flex gap-4">
              <Button
                variant={videoType === "merchant" ? "default" : "outline"}
                onClick={() => setVideoType("merchant")}
                className="flex-1"
              >
                Invite Merchants
              </Button>
              <Button
                variant={videoType === "user" ? "default" : "outline"}
                onClick={() => setVideoType("user")}
                className="flex-1"
              >
                Invite Users
              </Button>
            </div>
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription>
              {videoType === "merchant" ? (
                <p className="text-sm">
                  <strong>Merchant Videos:</strong> Showcase the benefits of listing their business on Global Pi Travel
                  (global reach, Pi payments, zero commission, etc.)
                </p>
              ) : (
                <p className="text-sm">
                  <strong>User Videos:</strong> Invite Pioneer friends to join and explore merchants worldwide. They get
                  benefits, you get rewards!
                </p>
              )}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="video-file">Upload Video (Max 100MB)</Label>
            <Input
              id="video-file"
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="cursor-pointer"
            />
            {uploadingVideo && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                {uploadingVideo.name} ({(uploadingVideo.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="video-title">Video Title</Label>
            <Input
              id="video-title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="e.g., Join Global Pi Travel - Benefits for Merchants"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video-description">Description</Label>
            <Textarea
              id="video-description"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              placeholder="Describe what's in your video..."
              rows={3}
            />
          </div>

          <Button onClick={handleSubmitVideo} className="w-full" size="lg" disabled={!uploadingVideo || !videoTitle}>
            <Upload className="mr-2 h-4 w-4" />
            Upload & Publish Video
          </Button>
        </CardContent>
      </Card>

      {/* Merchant Invitation Videos */}
      {merchantVideos.length > 0 && (
        <Card className="border-2 border-green-500">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
            <CardTitle className="text-green-900">Merchant Invitation Videos</CardTitle>
            <CardDescription>Videos promoting merchant registration benefits</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {merchantVideos.map((video) => (
                <Card key={video.id} className="border border-green-200">
                  <CardContent className="pt-4 space-y-3">
                    <div className="relative bg-slate-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                      <video src={video.videoUrl} className="w-full h-full object-cover" controls />
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground">{video.title}</h4>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Uploaded: {video.uploadedAt}</p>
                    </div>

                    <div className="flex gap-2 text-sm">
                      <Badge variant="secondary">
                        <Eye className="h-3 w-3 mr-1" />
                        {video.views}
                      </Badge>
                      <Badge variant="secondary">
                        <Share2 className="h-3 w-3 mr-1" />
                        {video.shares}
                      </Badge>
                      <Badge variant="default">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {video.referralsGenerated} referrals
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Share to Social Media</Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShareToSocial("facebook", video.id)}
                          className="flex-1"
                        >
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShareToSocial("twitter", video.id)}
                          className="flex-1"
                        >
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShareToSocial("whatsapp", video.id)}
                          className="flex-1"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShareToSocial("telegram", video.id)}
                          className="flex-1"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyShareLink(video.id)}
                        className="flex-1"
                      >
                        {copied ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied ? "Copied!" : "Copy Link"}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteVideo(video.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Invitation Videos */}
      {userVideos.length > 0 && (
        <Card className="border-2 border-purple-500">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-purple-900">User Invitation Videos</CardTitle>
            <CardDescription>Videos inviting Pioneer friends to join</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {userVideos.map((video) => (
                <Card key={video.id} className="border border-purple-200">
                  <CardContent className="pt-4 space-y-3">
                    <div className="relative bg-slate-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                      <video src={video.videoUrl} className="w-full h-full object-cover" controls />
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground">{video.title}</h4>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Uploaded: {video.uploadedAt}</p>
                    </div>

                    <div className="flex gap-2 text-sm">
                      <Badge variant="secondary">
                        <Eye className="h-3 w-3 mr-1" />
                        {video.views}
                      </Badge>
                      <Badge variant="secondary">
                        <Share2 className="h-3 w-3 mr-1" />
                        {video.shares}
                      </Badge>
                      <Badge variant="default">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {video.referralsGenerated} referrals
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Share to Social Media</Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShareToSocial("facebook", video.id)}
                          className="flex-1"
                        >
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShareToSocial("twitter", video.id)}
                          className="flex-1"
                        >
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShareToSocial("whatsapp", video.id)}
                          className="flex-1"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShareToSocial("telegram", video.id)}
                          className="flex-1"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyShareLink(video.id)}
                        className="flex-1"
                      >
                        {copied ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied ? "Copied!" : "Copy Link"}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteVideo(video.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {videos.length === 0 && (
        <Card className="border-2 border-dashed">
          <CardContent className="pt-12 pb-12 text-center">
            <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">No Videos Yet</h3>
            <p className="text-muted-foreground mb-6">
              Upload your first invitation video to start earning referral rewards!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
