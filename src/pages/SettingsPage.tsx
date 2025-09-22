import React, { useState } from "react";
import {
  Settings,
  EyeOff,
  Shield,
  Lock,
  Sun,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { usePanic } from "../contexts/PanicContext";

const SettingsPage: React.FC = () => {
  const { disguiseAs } = usePanic();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const clearAllData = () => {
    localStorage.clear();
    setShowConfirmClear(false);
    alert("All app data has been cleared successfully.");
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 dark:text-gray-200">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800 dark:text-purple-400 flex items-center justify-center">
          <Settings className="w-6 h-6 mr-2 text-purple-600 dark:text-purple-400" />
          Settings & Privacy
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Customize your experience and manage your privacy preferences.
        </p>
      </div>

      {/* Privacy Warning */}
      <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-100 dark:border-yellow-900 rounded-xl p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-yellow-500 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
              Privacy & Safety Considerations
            </h2>
            <p className="text-yellow-700 dark:text-yellow-400 mb-4">
              If someone has access to your device, they might discover this
              app. Consider using the disguise features or clearing your data
              when necessary.
            </p>
            <p className="text-yellow-700 dark:text-yellow-400 text-sm">
              <strong>Important:</strong> Remember that the panic button is
              always available in the bottom right corner if you need to quickly
              exit the app.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Disguise Options */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <EyeOff className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Disguise Options
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Quickly transform the app to appear as something else if someone
            approaches.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => disguiseAs("weather")}
              className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-100 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-blue-900"
            >
              <Sun className="w-5 h-5 mr-2" />
              Weather App
            </button>
            <button
              onClick={() => disguiseAs("notes")}
              className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-lg border border-green-100 dark:border-green-900 hover:bg-green-100 dark:hover:bg-green-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Notes App
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
            Security & Privacy
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Storage
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                All your data is stored locally on your device. Nothing is sent
                to any server.
              </p>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                Clear All Data
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Permanently remove all your journal entries, safety plan, and
                mood tracking data.
              </p>

              {!showConfirmClear ? (
                <button
                  onClick={() => setShowConfirmClear(true)}
                  className="flex items-center px-4 py-2 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 rounded-lg border border-red-100 dark:border-red-900 hover:bg-red-100 dark:hover:bg-red-900"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Clear All Data
                </button>
              ) : (
                <div className="bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-900 rounded-lg p-4">
                  <p className="text-red-700 dark:text-red-300 mb-3">
                    Are you sure? This action cannot be undone. All your entries
                    and settings will be permanently deleted.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={clearAllData}
                      className="px-4 py-2 bg-red-600 dark:bg-red-800 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-900"
                    >
                      Yes, Delete Everything
                    </button>
                    <button
                      onClick={() => setShowConfirmClear(false)}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
            About EiraSafe
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            EiraSafe was created to provide emotional support and practical
            tools for individuals experiencing domestic violence. Our mission is
            to empower survivors with resources that promote safety, healing,
            and resilience.
          </p>

          <p className="text-gray-600 dark:text-gray-400">
            If you're in immediate danger, please call your local emergency
            services or the National Domestic Violence Hotline at 1091 or 181.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;