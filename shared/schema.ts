import { pgTable, text, serial, integer, boolean, timestamp, varchar, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  service: varchar("service", { length: 100 }).notNull(),
  message: text("message").notNull(),
  postcode: varchar("postcode", { length: 20 }),
  honeypot: text("honeypot"), // Anti-spam field
  status: varchar("status", { length: 50 }).notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Solar calculator requests
export const solarCalculations = pgTable("solar_calculations", {
  id: serial("id").primaryKey(),
  monthlyBill: decimal("monthly_bill", { precision: 10, scale: 2 }).notNull(),
  propertyType: varchar("property_type", { length: 100 }).notNull(),
  roofDirection: varchar("roof_direction", { length: 50 }).notNull(),
  postcode: varchar("postcode", { length: 20 }),
  solarCoverage: integer("solar_coverage").notNull(),
  includeStorage: boolean("include_storage").notNull().default(false),
  systemSize: decimal("system_size", { precision: 10, scale: 2 }),
  annualGeneration: decimal("annual_generation", { precision: 10, scale: 2 }),
  annualSavings: decimal("annual_savings", { precision: 10, scale: 2 }),
  systemCost: decimal("system_cost", { precision: 10, scale: 2 }),
  paybackPeriod: decimal("payback_period", { precision: 10, scale: 2 }),
  co2Saved: decimal("co2_saved", { precision: 10, scale: 2 }),
  roiPercentage: decimal("roi_percentage", { precision: 10, scale: 2 }),
  email: varchar("email", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Energy data cache for real-time display
export const energyData = pgTable("energy_data", {
  id: serial("id").primaryKey(),
  gridPower: integer("grid_power").notNull(),
  renewable: decimal("renewable", { precision: 5, scale: 2 }).notNull(),
  evChargers: varchar("ev_chargers", { length: 50 }).notNull(),
  co2Intensity: integer("co2_intensity").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  subscribed: boolean("subscribed").notNull().default(true),
  source: varchar("source", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Create Zod schemas for validation
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service").max(100),
  message: z.string().min(10, "Message must be at least 10 characters"),
  postcode: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected"), // Anti-spam
});

export const insertSolarCalculationSchema = createInsertSchema(solarCalculations).omit({
  id: true,
  createdAt: true,
  systemSize: true,
  annualGeneration: true,
  annualSavings: true,
  systemCost: true,
  paybackPeriod: true,
  co2Saved: true,
  roiPercentage: true,
}).extend({
  monthlyBill: z.number().min(0, "Monthly bill must be positive").max(10000),
  propertyType: z.string().min(1, "Please select a property type"),
  roofDirection: z.string().min(1, "Please select roof direction"),
  postcode: z.string().optional(),
  solarCoverage: z.number().min(10).max(100),
  includeStorage: z.boolean(),
  email: z.string().email().optional(),
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  subscribed: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address").max(255),
  source: z.string().optional(),
});

// Export types
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

export type SolarCalculation = typeof solarCalculations.$inferSelect;
export type InsertSolarCalculation = z.infer<typeof insertSolarCalculationSchema>;

export type EnergyData = typeof energyData.$inferSelect;

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
