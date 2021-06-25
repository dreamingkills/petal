import {
  Channel,
  Client,
  Collection,
  Guild,
  GuildChannel,
  Member,
  Message,
  Shard,
  TextChannel,
  User,
  VoiceState,
} from "eris";

export default class MockDiscord {
  private client!: Client;
  private shard!: Shard;
  private guild!: Guild;
  private channel!: Channel;
  private guildChannel!: GuildChannel;
  private textChannel!: TextChannel;
  private user!: User;
  private guildMember!: Member;
  public message!: Message;

  constructor() {
    this.mockClient();
    this.mockShard();
    this.mockGuild();
    this.mockChannel();
    this.mockGuildChannel();
    this.mockTextChannel();
    this.mockUser();
    this.mockGuildMember();
    this.mockMessage();
  }

  public getClient() {
    return this.client;
  }

  public getGuild() {
    return this.guild;
  }

  public getChannel() {
    return this.channel;
  }

  public getGuildChannel() {
    return this.guildChannel;
  }

  public getTextChannel() {
    return this.textChannel;
  }

  public getUser() {
    return this.user;
  }

  public getGuildMember() {
    return this.guildMember;
  }

  public getMessage(content: string = ""): Message {
    this.message.content = content;
    return this.message;
  }

  private mockClient() {
    this.client = new Client("TOKEN");
  }

  private mockShard() {
    this.shard = new Shard(0, this.client);
  }

  private mockGuild() {
    this.guild = new Guild(
      {
        afkChannelId: `afk-channel-id`,
        afkTimeout: 300,
        applicationId: `application-id`,
        approximateMemberCount: 0,
        approximatePresenceCount: 0,
        autoRemoved: false,
        banner: "banner-hash",
        bannerURL: "banner-url",
        categories: [] as Object[],
        channels: new Collection(GuildChannel),
        createdAt: 0,
        defaultNotifications: 0,
        description: `guild-description`,
        discoverySplash: `image-hash`,
        discoverySplashURL: `image-url`,
        emojiCount: 0,
        emojis: [] as Object[],
        explicitContentFilter: 0,
        features: [] as string[],
        icon: "icon-hash",
        iconURL: "icon-url",
        id: `guild-id`,
        joinedAt: 0,
        keywords: [] as string[],
        large: false,
        maxMembers: 5000,
        maxPresences: 5000,
        maxVideoChannelUsers: 100,
        memberCount: 0,
        members: new Collection(Member),
        mfaLevel: 0,
        name: "guild-name",
        nsfw: false,
        ownerID: "owner-id",
        preferredLocale: "guild-locale",
        premiumSubscriptionCount: 0,
        premiumTier: 0,
        primaryCategory: {},
        primaryCategoryID: 0,
        publicUpdatesChannelID: "channel-id",
        shard: this.shard,
        splash: "splash-hash",
        splashURL: "splash-url",
        systemChannelFlags: 0,
        systemChannelID: "channel-id",
        unavailable: 0,
        vanityURL: "image-url",
        verificationLevel: 0,
        voiceStates: new Collection(VoiceState),
        welcomeScreen: {},
        widgetChannelID: 0,
        widgetEnabled: false,
      },
      this.client
    );
    this.guild.shard = this.shard;
  }

  private mockChannel() {
    this.channel = new Channel({ id: "channel-id" });
  }

  private mockGuildChannel() {
    // @ts-ignore
    this.guildChannel = new GuildChannel({ id: "channel-id" }, this.client);
  }

  private mockTextChannel() {
    this.textChannel = new TextChannel(
      { id: "text-channel-id" },
      // @ts-ignore - This is documented incorrectly.
      this.client,
      1
    );
  }

  private mockUser() {
    this.user = new User({ id: "user-id" }, this.client);
  }

  private mockGuildMember() {
    this.guildMember = new Member(
      { id: "member-id", user: this.user },
      this.guild,
      this.client
    );
  }

  private mockMessage() {
    this.message = new Message(
      {
        activity: undefined as {} | undefined,
        application: undefined as {} | undefined,
        attachments: [] as Object[],
        author: this.user,
        channel: this.textChannel,
        channel_id: this.textChannel.id,
        channelMentions: [] as string[],
        content:
          "The sun, the moon, the stars shine less brightly with you so far. I never knew sorrow 'til you asked me to follow my heart. For all the tales I've told, and these whispers of silver and gold, I'd throw them all away to gaze on your face once more.",
        createdAt: 0,
        editedTimestamp: undefined as undefined | number,
        embeds: [] as Object[],
        flags: 0,
        guildID: this.guild.id,
        id: "message-id",
        interaction: undefined as {} | undefined,
        jumpLink: "jump-link",
        member: this.guildMember as Member | undefined,
        mentionEveryone: false,
        mentions: [] as Array<User>,
        messageReference: undefined as {} | undefined,
        pinned: false,
        reactions: [],
        referencedMessage: undefined as Message | undefined,
        roleMentions: [] as string[],
        stickers: undefined as Object[] | undefined,
        timestamp: 0,
        tts: false,
        type: 0,
        webhookID: undefined as string | undefined,
      },
      this.client
    );

    this.message.channel = this.textChannel;
    console.log(this.message.channel.createMessage);
  }
}
