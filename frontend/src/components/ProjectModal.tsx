import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Github, Calendar, FileText, Link, Layers } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; githubRepo: string; url: string }) => void;
  week: number;
  project?: {
    title: string;
    description: string;
    techStack: string;
    githubRepo?: string;
    url?: string;
  };
}

export const ProjectModal = ({ isOpen, onClose, onSubmit, week, project }: ProjectModalProps) => {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [githubRepo, setGithubRepo] = useState(project?.githubRepo || '');
  const [url, setUrl] = useState(project?.url || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, githubRepo, url });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-gray-800 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-green-400">Week {week} Project</CardTitle>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-green-400">
              <FileText className="inline h-4 w-4 mr-2" />
              Project Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
              className="bg-gray-700 border-green-500/30 text-white placeholder:text-gray-400"
              required
            />
          </div>
          
          <div className="space-y-2">
              <Label htmlFor="description" className="text-green-400">
                <FileText className="inline h-4 w-4 mr-2" />
                Project Description *
            </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
              className="bg-gray-700 border-green-500/30 text-white placeholder:text-gray-400"
              required
            />
          </div>
          
          <div className="space-y-2">
              <Label htmlFor="url" className="text-green-400">
                <Link className="inline h-4 w-4 mr-2" />
                Project URL *
            </Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-project-url.com"
                className="bg-gray-700 border-green-500/30 text-white placeholder:text-gray-400"
                required
              />
          </div>
          
          <div className="space-y-2">
              <Label htmlFor="githubRepo" className="text-green-400">
                <Github className="inline h-4 w-4 mr-2" />
                GitHub Repository
            </Label>
              <Input
                id="githubRepo"
                value={githubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="bg-gray-700 border-green-500/30 text-white placeholder:text-gray-400"
            />
          </div>
            <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
                className="border-green-500/30 text-gray-300 hover:bg-green-500/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
                className="bg-green-500 text-black hover:bg-green-400"
            >
              Submit Project
            </Button>
          </div>
        </form>
        </CardContent>
      </Card>
    </div>
  );
};
