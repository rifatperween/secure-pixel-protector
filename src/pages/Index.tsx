import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Lock, Unlock, Shield } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [encryptKey, setEncryptKey] = useState("");
  const [decryptKey, setDecryptKey] = useState("");

  const handleEncrypt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'encrypted_image.bin';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error encrypting image:', error);
    }
  };

  const handleDecrypt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('http://localhost:5000/decrypt', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'decrypted_image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error decrypting image:', error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">Secure Image Processor</h1>
          <p className="text-xl mb-8 animate-fade-in">
            Protect your images with military-grade encryption
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="animate-fade-in"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-8">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold mb-6">About Our System</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our system uses advanced AES encryption to secure your images. 
            With military-grade security protocols, your visual data remains 
            protected and private.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Encrypt Card */}
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Encrypt</h3>
              </div>
              <form onSubmit={handleEncrypt} className="space-y-4">
                <div>
                  <Label htmlFor="encrypt-file">Upload Image</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Input 
                      id="encrypt-file" 
                      name="encrypt-file"
                      type="file" 
                      accept="image/*" 
                      required
                    />
                    <Upload className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="encrypt-key">Security Key</Label>
                  <Input 
                    id="encrypt-key" 
                    name="key"
                    type="password" 
                    placeholder="Enter your security key" 
                    value={encryptKey}
                    onChange={(e) => setEncryptKey(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Encrypt Image</Button>
              </form>
            </Card>

            {/* Decrypt Card */}
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <Unlock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Decrypt</h3>
              </div>
              <form onSubmit={handleDecrypt} className="space-y-4">
                <div>
                  <Label htmlFor="decrypt-file">Upload Encrypted File</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Input 
                      id="decrypt-file" 
                      name="decrypt-file"
                      type="file" 
                      accept=".bin" 
                      required
                    />
                    <Upload className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="decrypt-key">Security Key</Label>
                  <Input 
                    id="decrypt-key" 
                    name="key"
                    type="password" 
                    placeholder="Enter your security key" 
                    value={decryptKey}
                    onChange={(e) => setDecryptKey(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Decrypt Image</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            Created with ❤️ by Your Team
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;