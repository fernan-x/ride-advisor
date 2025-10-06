import { useEffect, useState } from "react";
import { Save, MapPin } from "lucide-react";
import {
  getAllGear,
  getUserCity,
  updateUserCity,
} from "../lib/gearRecommendation";
import { getCityList } from "../lib/weather";
import { GearList } from "../modules/gears/application/components/GearList";
import { GearRuleList } from "@/modules/gears/application/components/GearRuleList";

export default function Settings() {
  const [selectedGear, setSelectedGear] = useState<string>("");
  const [city, setCity] = useState<string>("Nantes");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const cities = getCityList();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [gearData, userCity] = await Promise.all([
      getAllGear(),
      getUserCity(),
    ]);
    setCity(userCity);
    if (gearData.length > 0 && !selectedGear) {
      setSelectedGear(gearData[0].id);
    }
    setLoading(false);
  };

  const handleSaveCity = async () => {
    setSaving(true);
    await updateUserCity(city);
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Configuration
          </h1>
          <p className="text-gray-600">
            Configurez votre ville et vos équipements
          </p>
        </div>

        {/* City Settings */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-2 mb-6">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Votre ville
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              onClick={handleSaveCity}
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? "Sauvegarde en cours..." : "Sauvegarder"}</span>
            </button>
          </div>
        </div>

        <GearList />

        <GearRuleList />

        {/* <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Gear Rules
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Gear Item
              </label>
              <select
                value={selectedGear}
                onChange={(e) => setSelectedGear(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              >
                {gear.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Current Rules
                </h3>
                {rules.length > 0 ? (
                  <div className="space-y-2">
                    {rules.map((rule) => (
                      <div
                        key={rule.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <span className="text-gray-700">
                          {getRuleDescription(rule)}
                        </span>
                        <button
                          onClick={() => handleDeleteRule(rule.id)}
                          className="p-1 hover:bg-red-100 rounded transition-colors"
                          title="Delete rule"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No rules configured for this item
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Add New Rule
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={tempMin}
                    onChange={(e) => setTempMin(e.target.value)}
                    placeholder="e.g., 0"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for no minimum
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={tempMax}
                    onChange={(e) => setTempMax(e.target.value)}
                    placeholder="e.g., 10"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for no maximum
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rain Condition
                  </label>
                  <select
                    value={rainCondition}
                    onChange={(e) => setRainCondition(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  >
                    <option value="any">Any weather</option>
                    <option value="raining">When raining</option>
                    <option value="dry">When dry</option>
                  </select>
                </div>

                <button
                  onClick={handleAddRule}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Rule</span>
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Rule Examples
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Winter socks: 0°C - 10°C</li>
                  <li>• Northface jacket: ≤ 5°C or when raining</li>
                  <li>• Short: ≥ 20°C, when dry</li>
                  <li>• Leg warmer: 5°C - 15°C</li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
