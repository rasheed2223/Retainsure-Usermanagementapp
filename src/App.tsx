import React from 'react';
import { Shield, Users, Lock, CheckCircle, Code, Database } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">User Management API Demo</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Production-Ready API Refactoring
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive demonstration of transforming legacy code into a secure, 
            well-structured, and maintainable user management API.
          </p>
        </div>

        {/* Key Improvements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Lock className="w-8 h-8 text-red-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Security First</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Password hashing with bcrypt
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                JWT authentication
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Input validation & sanitization
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Security headers with Helmet
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Code className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Clean Architecture</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Layered architecture pattern
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Separation of concerns
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                TypeScript for type safety
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Modular file organization
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Database className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Best Practices</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Centralized error handling
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Proper HTTP status codes
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Database indexing
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Comprehensive testing
              </li>
            </ul>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-indigo-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">API Endpoints</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono">GET</span>
                  <code className="text-gray-700">/api/users</code>
                </div>
                <p className="text-gray-600 text-sm mt-1">Get all users (protected)</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono">GET</span>
                  <code className="text-gray-700">/api/user/:id</code>
                </div>
                <p className="text-gray-600 text-sm mt-1">Get specific user (protected)</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">POST</span>
                  <code className="text-gray-700">/api/users</code>
                </div>
                <p className="text-gray-600 text-sm mt-1">Create new user (public)</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">POST</span>
                  <code className="text-gray-700">/api/login</code>
                </div>
                <p className="text-gray-600 text-sm mt-1">User authentication (public)</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-mono">PUT</span>
                  <code className="text-gray-700">/api/user/:id</code>
                </div>
                <p className="text-gray-600 text-sm mt-1">Update user (protected)</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-mono">DELETE</span>
                  <code className="text-gray-700">/api/user/:id</code>
                </div>
                <p className="text-gray-600 text-sm mt-1">Delete user (protected)</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono">GET</span>
                  <code className="text-gray-700">/api/search?name=x</code>
                </div>
                <p className="text-gray-600 text-sm mt-1">Search users by name (protected)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Links */}
        <div className="bg-indigo-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Documentation</h3>
          <p className="text-gray-600 mb-6">
            View the comprehensive CHANGES.md file for detailed explanations of all improvements,
            architectural decisions, and trade-offs made during the refactoring process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm font-medium text-gray-700">📁 Organized file structure</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm font-medium text-gray-700">🔒 Security improvements</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm font-medium text-gray-700">🧪 Testing examples</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm font-medium text-gray-700">📚 Best practices</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>This demo showcases production-ready API refactoring techniques and best practices.</p>
            <p className="mt-2 text-sm">Built with Express.js, TypeScript, and modern security practices.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
