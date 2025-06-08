import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getByIds = query({
args: {ids: v.array(v.id("documents"))},
  handler: async (ctx, { ids }) => {
    const documents = [];
    for(const id of ids) {
      const doc = await ctx.db.get(id);

      if(doc) {
        documents.push({id: doc._id, name: doc.title});
      } else {
        documents.push({id, name: "[Deleted]"});
      }
    }
    
    return documents;
  },
});

export const getDocuments = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string())},
  handler: async (ctx, { paginationOpts, search}) => {
    const user = await ctx.auth.getUserIdentity();
    if(!user) {
      throw new ConvexError("Unauthorized")
    }

    const organizationId = (user.organization_id ?? undefined) as | string | undefined;

    if(search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) => 
          q.search("title", search).eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    } 
    
    if(search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) => 
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }

    if(organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) => 
          q.eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => 
        q.eq("ownerId", user.subject)
      )
      .paginate(paginationOpts);
  },
});

export const getDocumentById = query({
  args: {id: v.id("documents")},
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const createDocument = mutation({
  args: { 
    title: v.optional(v.string()),
    initialContent: v.optional(v.string())
   },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if(!user) {
      throw new ConvexError("Unauthorized")
    }

    const organizationId = (user.organization_id ?? undefined) as | string | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document", 
      ownerId: user.subject,
      organizationId: organizationId,
      initialContent: args.initialContent ?? ""
    });
  },
});

export const deleteDocumentById = mutation({
  args: { 
    id: v.id("documents")
   },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if(!user) {
      throw new ConvexError("Unauthorized")
    }

    const document = await ctx.db.get(args.id);
    if(!document) {
      throw new ConvexError("Document not found");
    }
    const organizationId = (user.organization_id ?? undefined) as | string | undefined;
    const isOwner = document.ownerId === user.subject;
    const isSameOrg = document.organizationId && document.organizationId === organizationId;
    if(!isOwner && !isSameOrg) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.delete(args.id);
  },
});

export const updateDocumentById = mutation({
  args: { 
    id: v.id("documents"),
    title: v.string()
   },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if(!user) {
      throw new ConvexError("Unauthorized")
    }

    const document = await ctx.db.get(args.id);
    if(!document) {
      throw new ConvexError("Document not found");
    }

    const organizationId = (user.organization_id ?? undefined) as | string | undefined;
    const isOwner = document.ownerId === user.subject;
    const isSameOrg = document.organizationId && document.organizationId === organizationId;
    if(!isOwner && !isSameOrg) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.patch(args.id, {title: args.title});
  },
});